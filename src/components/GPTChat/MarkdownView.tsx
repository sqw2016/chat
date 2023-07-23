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

const MarkdownView: React.FC<MarkdownViewProps> = ({ content, onOver=() => {}, isNew = false }) => {
	const ref = useRef()
	const [str, setStr] = useState("")
	const [scrollParent, setScrollParent] = useState()

	useEffect(() => {
		if (!isNew) return setStr(content);
		let index = 0
		const timer = setInterval(() => {
			if (index >= content.length) {
				clearInterval(timer)
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
		setScrollParent(findScrollParent(ref.current))
		return () => {
			clearInterval(timer)
		}
	}, [content])

	useEffect(() => {
		scrollParent && scrollParent.scrollTo({top: scrollParent.clientHeight})
	})

	marked.setOptions({
		highlight(code, lang) {
			if (lang && hljs.getLanguage(lang)) return hljs.highlight(code, { language: lang }).value;
			return hljs.highlightAuto(code).value;
		}
	})


	const parsedContent = marked.parse(str)

	return (
		<div ref={ref} dangerouslySetInnerHTML={{ __html: parsedContent}}>
		</div>
	);
};

export default MarkdownView;
