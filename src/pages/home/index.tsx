import { useState, useRef, useEffect } from "react";
import ChatInput from "@/components/ChatInput";
import UserChat from "@/components/UserChat";
import GPTChat from "@/components/GPTChat";
import axios from "axios"
import {v4 as uuidv4} from "uuid"

import styles from "./index.module.less";

const STORAGE_KEY = "chatStorage"

const content = `There are several ways to upload files to an AWS EC2 server. Here are a few common methods:\n\n1. Using SSH: \n   - Connect to your EC2 instance using SSH.\n   - Use the \`scp\` command to securely copy files from your local machine to the EC2 instance. For example:\n     \`\`\`\n     scp -i <path_to_key_pair> <path_to_local_file> <username>@<public_dns_name>:<path_on_ec2_instance>\n     \`\`\`\n   - Replace \`<path_to_key_pair>\` with the path to your key pair file, \`<path_to_local_file>\` with the path to the file you want to upload, \`<username>\` with the username of your EC2 instance, \`<public_dns_name>\` with the public DNS name of your EC2 instance, and \`<path_on_ec2_instance>\` with the desired path on the EC2 instance.\n\n2. Using SFTP:\n   - Connect to your EC2 instance using an SFTP client like FileZilla or WinSCP.\n   - Enter the EC2 instance's public DNS name, username, and private key file in the SFTP client's settings.\n   - Use the SFTP client's interface to navigate to the desired directory on the EC2 instance and upload files from your local machine.\n\n3. Using AWS CLI:\n   - Install and configure the AWS Command Line Interface (CLI) on your local machine.\n   - Use the \`aws s3 cp\` command to upload files to an S3 bucket, and then use the \`aws s3 sync\` command to sync the S3 bucket with your EC2 instance. For example:\n     \`\`\`\n     aws s3 cp <path_to_local_file> s3://<bucket_name>/<path_in_s3_bucket>\n     aws s3 sync s3://<bucket_name>/<path_in_s3_bucket> <path_on_ec2_instance>\n     \`\`\`\n   - Replace \`<path_to_local_file>\` with the path to the file you want to upload, \`<bucket_name>\` with the name of your S3 bucket, \`<path_in_s3_bucket>\` with the desired path in the S3 bucket, and \`<path_on_ec2_instance>\` with the desired path on the EC2 instance.\n\nThese are just a few examples of how to upload files to an AWS EC2 server. The method you choose may depend on your specific requirements and preferences.`

const Home = () => {
	const sizeRef = useRef()
	const styleRef = useRef()

	const [input, setInput] = useState();
	const [chats, setChats] = useState([])
	const [loading, setLoading] = useState(false)

	const getAnswers = () => {
		setLoading(true)
		axios.post("", {content: input, length: sizeRef.current.value, style: styleRef.current.value }).then(res => {
			const content = res.data.data;
			setChats(newChats => {
				newChats[newChats.length - 1] = {...newChats[newChats.length - 1], isNew: true,  id: uuidv4(), content}
				return [...newChats]
			})
		})
	}

	const onOver = () => {
		setLoading(false)
	}

	const onSubmit = () => {
		chats.push({
			id: uuidv4(),
			type: 1,
			content: input
		}, {
			id: uuidv4(),
			type: 2,
			content: "typing"
		})
		
		getAnswers()

		setTimeout(() => {
			setChats(newChats => {
				newChats[newChats.length - 1] = {...newChats[newChats.length - 1], id: uuidv4(), isNew: true, content}
				return [...newChats]
			})
		}, 2000)

		setChats([...chats])
		setInput("")
	}

	// useEffect(() => {
	// 	// 获取本地缓存的 chats
	// 	const storageChats = localStorage.getItem(STORAGE_KEY);
	// 	if (storageChats?.length) setChats(JSON.parse(storageChats))
	// }, [])
	//
	// useEffect(() => {
	// 	// 清理 isNew，并将新的 chats 放到 Storage 中
	// 	const storageChats = chats.map(item => ({...item, isNew: false}))
	// 	localStorage.setItem(STORAGE_KEY, JSON.stringify(storageChats))
	// }, [chats])

	return <div className={styles.container}>
		<div className={styles.header}>
			<label htmlFor="size">
				请选择字数限制
				<select ref={sizeRef} name="size">
					<option value="100">100</option>
					<option value="200">200</option>
					<option value="300">300</option>
					<option value="400">400</option>
					<option value="500">500</option>
				</select>
			</label>
			<label htmlFor="style">
				请选择文风
				<select ref={styleRef} name="style">
					<option value="抖音">抖音</option>
					<option value="微博">微博</option>
				</select>
			</label>
		</div>
		<div className={styles.content}>
			{
				chats.map(item => {
					if (item.type === 1) return <UserChat key={item.id} content={item.content} />
					return <GPTChat onOver={onOver} isNew={item.isNew} key={item.id} content={item.content} />
				})
			}
		</div>
		<div className={styles.input}>
			<ChatInput loading={loading} onSubmit={onSubmit} value={input} onChange={e => setInput(e.target.value)} />
		</div>
	</div>
}

export default Home
