import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	content: {
		padding: theme.spacing(3, 0, 3),
	},
}));

type CSVFileImportProps = {
	url: string;
	title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
	const classes = useStyles();
	const [file, setFile] = useState<any>();

	const onFileChange = (e: any) => {
		let files = e.target.files || e.dataTransfer.files;
		if (!files.length) return;
		setFile(files.item(0));
	};

	const removeFile = () => {
		setFile('');
	};

	const uploadFile = async (e: any) => {
		// Get the presigned URL
		const token = localStorage.getItem('auth');
		const headers = {};

		if (!token) {
			console.warn('Token is not defined in local storage. Please set `auth-token` value.');
		} else {
			// @ts-ignore
			headers.Authorization = `Basic ${Buffer.from(token).toString('base64')}`;
		}

		const response = await axios({
			headers,
			method: 'GET',
			url,
			params: {
				name: encodeURIComponent(file.name),
			},
		});

		console.log('File to upload: ', file.name);
		console.log('Uploading to: ', response.data);
		const result = await fetch(response.data, {
			method: 'PUT',
			body: file,
		});
		console.log('Result: ', result);
		setFile('');
	};
	return (
		<div className={classes.content}>
			<Typography variant="h6" gutterBottom>
				{title}
			</Typography>
			{!file ? (
				<input type="file" onChange={onFileChange} />
			) : (
				<div>
					<button onClick={removeFile}>Remove file</button>
					<button onClick={uploadFile}>Upload file</button>
				</div>
			)}
		</div>
	);
}
