import { useState, useEffect } from "react";
import { marked } from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from "highlight.js";

import "github-markdown-css/github-markdown-dark.css"
import "highlight.js/styles/dark.css"
import styles from "./index.module.less";

const content = `There are several ways to upload files to an AWS EC2 server. Here are a few common methods:\n\n1. Using SSH: \n   - Connect to your EC2 instance using SSH.\n   - Use the \`scp\` command to securely copy files from your local machine to the EC2 instance. For example:\n     \`\`\`\n     scp -i <path_to_key_pair> <path_to_local_file> <username>@<public_dns_name>:<path_on_ec2_instance>\n     \`\`\`\n   - Replace \`<path_to_key_pair>\` with the path to your key pair file, \`<path_to_local_file>\` with the path to the file you want to upload, \`<username>\` with the username of your EC2 instance, \`<public_dns_name>\` with the public DNS name of your EC2 instance, and \`<path_on_ec2_instance>\` with the desired path on the EC2 instance.\n\n2. Using SFTP:\n   - Connect to your EC2 instance using an SFTP client like FileZilla or WinSCP.\n   - Enter the EC2 instance's public DNS name, username, and private key file in the SFTP client's settings.\n   - Use the SFTP client's interface to navigate to the desired directory on the EC2 instance and upload files from your local machine.\n\n3. Using AWS CLI:\n   - Install and configure the AWS Command Line Interface (CLI) on your local machine.\n   - Use the \`aws s3 cp\` command to upload files to an S3 bucket, and then use the \`aws s3 sync\` command to sync the S3 bucket with your EC2 instance. For example:\n     \`\`\`\n     aws s3 cp <path_to_local_file> s3://<bucket_name>/<path_in_s3_bucket>\n     aws s3 sync s3://<bucket_name>/<path_in_s3_bucket> <path_on_ec2_instance>\n     \`\`\`\n   - Replace \`<path_to_local_file>\` with the path to the file you want to upload, \`<bucket_name>\` with the name of your S3 bucket, \`<path_in_s3_bucket>\` with the desired path in the S3 bucket, and \`<path_on_ec2_instance>\` with the desired path on the EC2 instance.\n\nThese are just a few examples of how to upload files to an AWS EC2 server. The method you choose may depend on your specific requirements and preferences.`

const MarkdownView = () => {

	const [str, setStr] = useState("")

	useEffect(() => {
		let index = 0
		const timer = setInterval(() => {
			if (index >= content.length) {
				clearInterval(timer)
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
	}, [])

	marked.setOptions({
		highlight(code, lang) {
			if (lang && hljs.getLanguage(lang)) return hljs.highlight(code, { language: lang }).value;
			return hljs.highlightAuto(code).value;
		}
	})


	const parsedContent = marked.parse(str)

	return (
		<div dangerouslySetInnerHTML={{ __html: parsedContent}}>
		</div>
	);
};

export default MarkdownView;
