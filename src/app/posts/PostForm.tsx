"use client";
import { useActionState, useEffect, useState } from "react";

const initialState = {
	message: "",
};

type Tag = {
	x: number;
	y: number;
	itemId: string;
};

export default function PostForm({ postData, action, title }) {
	const [description, setDescription] = useState("");
	const [imageFile, setImageFile] = useState(null);
	const [imageUrl, setImageUrl] = useState("");
	const [button, setButton] = useState("Save");
	const [tags, setTags] = useState<Tag[]>([]);
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [itemId, setItemId] = useState("");

	useEffect(() => {
		if (postData) {
			setDescription(postData.description);
			setImageUrl(postData.imageUrl); // Set the image URL if provided in info
			setTags(postData.tags);
			setButton("Save");
		} else {
			setButton("Post");
		}
	}, [postData]);

	const [state, formAction, pending] = useActionState(action, initialState);

	const handleFileChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setImageFile(e.target.files[0]);
		}
	};

	const addTag = (e) => {
		e.preventDefault();
		const newTag: Tag = { x: x, y: y, itemId: itemId };
		setTags([...tags, newTag]);
		setX(0);
		setY(0);
		setItemId("");
	};

	return (
		<div>
			<h1>{title}</h1>
			<form action={formAction}>
				<div>
					{imageUrl ? (
						// Display the fetched image if imageUrl exists
						<div>
							<p>Existing Image:</p>
							<img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%", height: "auto" }} />
						</div>
					) : (
						<div>
							<label htmlFor="imageFile">Upload Image File:</label>
							<input type="file" name="image_file" id="imageFile" accept="image/*" onChange={handleFileChange} />
							{imageFile && (
								<div>
									<p>Preview:</p>
									<img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ maxWidth: "100%", height: "auto" }} />
								</div>
							)}
						</div>
					)}
				</div>
				<div>
					<label htmlFor="description">Description:</label>
					<textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
				</div>
				<input type="hidden" name="tags" value={JSON.stringify(tags)} />
				{state && <p className="error-message">{state.message}</p>}
				<button type="submit" disabled={pending}>
					{pending ? "Loading..." : button}
				</button>
			</form>

			{/* Tagging Section */}
			<div>
				<h3>Add Tags</h3>
				<form onSubmit={addTag}>
					<input type="number" value={x} onChange={(e) => setX(Number(e.target.value))} placeholder="X coordinate" />
					<input type="number" value={y} onChange={(e) => setY(Number(e.target.value))} placeholder="Y coordinate" />
					<input type="text" value={itemId} onChange={(e) => setItemId(e.target.value)} placeholder="Item ID" />
					<button type="submit">Add Tag</button>
				</form>
				<div>
					{tags.map((tag, index) => (
						<div key={index}>
							Tag {index + 1}: X={tag.x}, Y={tag.y}, ID={tag.itemId}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
