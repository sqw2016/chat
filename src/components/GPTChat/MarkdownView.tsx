import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import hljs from "highlight.js";

import "github-markdown-css/github-markdown-dark.css"
import "highlight.js/styles/dark.css"
import styles from "./index.module.less";

interface MarkdownViewProps {
	content: string,
	onOver?: () => void,
	isNew: boolean
}

const findScrollParent = node => {
	const parent = node.parentElement
	if (parent) {
		const overflowY = getComputedStyle(parent, null).getPropertyValue("overflow-y")
		if (["auto", "scroll"].includes(overflowY)) return parent
		return findScrollParent(parent)
	}
}

// 获取最后一个文本节点
const getLastTextNode = (node) => {
	const childNodes = node.childNodes
	for (let i = childNodes.length - 1; i > -1 ; i--) {
		if (childNodes[i].nodeType === Node.TEXT_NODE && /\S+/.test(childNodes[i].nodeValue) ) return childNodes[i]
		const subNode = getLastTextNode(childNodes[i])
		if (subNode) return subNode;
	}
}

const getEndTextPosition = (textNode) => {
	if (!textNode) return
	const cursorText = document.createTextNode(" ")
	textNode.parentNode.appendChild(cursorText)
	const range = document.createRange()
	range.setStart(cursorText, 0)
	range.setEnd(cursorText, 0);
	const {x, y} = range.getBoundingClientRect();
	return {
		x, y
	}
}

const computeCursorPosition = (node) => {
	const lastTextNode = getLastTextNode(node)
	return getEndTextPosition(lastTextNode)
}

const MarkdownView: React.FC<MarkdownViewProps> = ({ content, onOver=() => {}, isNew = false }) => {
	const ref = useRef()
	const cursorRef = useRef()
	const [str, setStr] = useState("")
	const [scrollParent, setScrollParent] = useState()
	const [showCursor, setShowCursor] = useState(false)

	const setCursorPosition = (position) => {
		if (!cursorRef.current) return
		cursorRef.current.style.left = position.x + "px"
		cursorRef.current.style.top = position.y + "px"
	}

	useEffect(() => {
		setScrollParent(findScrollParent(ref.current))
		if (!isNew) return setStr(content);
		let index = 0
		setShowCursor(true)
		const timer = setInterval(() => {
			if (index >= content.length) {
				clearInterval(timer)
				setShowCursor(false)
				onOver()
				return
			}
			setStr(s => {
				let newS = s;
				// 添加空白字符
				while(/\s/.test(content[index])) {
					newS += content[index++]
				}
				return newS + content[index++]
			})
		}, 10)
		return () => {
			clearInterval(timer)
		}
	}, [content])

	useEffect(() => {
		scrollParent && scrollParent.scrollTo({top: scrollParent.scrollHeight})
	})
	
	useEffect(() => {
		const newPosition = computeCursorPosition(ref.current)
		newPosition && setCursorPosition(newPosition)
	}, [str])
	
	marked.setOptions({
		highlight(code, lang) {
			if (lang && hljs.getLanguage(lang)) return hljs.highlight(code, { language: lang }).value;
			return hljs.highlightAuto(code).value;
		}
	})


	const parsedContent = marked.parse(str)

	return <>
		<div className="markdown-body" ref={ref} dangerouslySetInnerHTML={{ __html: parsedContent}}>
		</div>
		{ showCursor && <div ref={cursorRef} className={styles.cursor} /> }
	</>;
};

export default MarkdownView;
