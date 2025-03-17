import express from "express";
import * as itemController from "../controllers/itemController.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const listItems = await itemController.getAllItems();
		const availableLists = await itemController.getNameLists();

		res.render("index.ejs", { listTitle: "Every Items", listItems: listItems, availableLists: availableLists });
	} catch (error) {
		res.status(500).json({ error: "Error fetching items" });
	}
});

router.get("/:listName", async (req, res) => {
	const listName = req.params.listName;
	try {
		const listItems = await itemController.getItemsByList(listName);
		const availableLists = await itemController.getNameLists();

		res.render("index.ejs", { listTitle: listName, listItems: listItems, availableLists: availableLists });
	} catch (error) {
		res.status(500).json({ error: "Error fetching items" });
	}
});

router.post("/add", async (req, res) => {
	try {
		const list = req.body.newListName || req.body.newItemListName;
		await itemController.addItem(req.body);
		res.redirect(`/${list}`);
	} catch (error) {
		res.status(500).json({ error: "Error adding item" });
	}
});

router.post("/edit", async (req, res) => {
	try {
		const item = {
			id: req.body.updatedItemId,
			title: req.body.updatedItemTitle,
			dueDate: req.body.updatedItemDueDate,
			listName: req.body.updatedItemListName,
		};
		await itemController.updateItem(item);
		res.redirect(`/${req.body.updatedItemListName}`);
	} catch (error) {
		res.status(500).json({ error: "Error updating item" });
	}
});

router.post("/delete", async (req, res) => {
	try {
		await itemController.deleteItem(req.body.id);
		res.redirect('/');
	} catch (error) {
		res.status(500).json({ error: "Error deleting item" });
	}
});

router.post("/check", async (req, res) => {
	try {
		await itemController.checkItem(req.body.id);
		res.redirect('/');
	} catch (error) {
		res.status(500).json({ error: "Error checking item" });
	}
});

export default router;
