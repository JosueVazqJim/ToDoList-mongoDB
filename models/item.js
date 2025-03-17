import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		dueDate: { type: Date, required: true },
		listName: { type: String, required: true },
		completed: { type: Boolean, default: false },
		deleted: { type: Boolean, default: false },
	},
	{ strict: true }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
