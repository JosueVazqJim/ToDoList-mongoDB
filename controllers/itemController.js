import Item from "../models/item.js";

async function getAllItems() {
	try {
		const items = await Item.find({ deleted: false });
		return items;
	} catch (error) {
		console.error("Error getting items:", error);
		throw error;
	}
}

//obtener los tipos de listas
async function getNameLists() {
	try {
        const items = await Item.find({ deleted: false });
        const listNames = [...new Set(items.map((item) => item.listName))];
        return listNames;
	} catch (error) {
		console.error("Error getting items:", error);
		throw error;
	}
}

async function getItemsByList(listName) {
	try {
		const items = await Item.find({ listName: listName, deleted: false });
		return items;
	} catch (error) {
		console.error("Error getting items by list:", error);
		throw error;
	}
}

async function addItem(req) {
    const { newItemTitle, newItemDueDate, newItemListName, newListName } = req;
    const listName = newListName || newItemListName;

    const newItem = new Item({
        title: newItemTitle,
        dueDate: newItemDueDate,
        listName: listName,
    });

    try {
        await newItem.save();
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
}

async function updateItem(item) {
	try {
		const itemOriginal = await Item.findById(item.id);
		if (!itemOriginal) {
			throw new Error("Item not found");
		}

		// Iterate over the keys of the item and update only if the value is not empty
		for (const key in item) {
			if (item[key] === "" || item[key] === null || item[key] === undefined) {
				item[key] = itemOriginal[key];
			}
		}

		await Item.findByIdAndUpdate(item.id, item);
	} catch (error) {
		console.error("Error updating item:", error);
		throw error;
	}
}

async function deleteItem(id) {
	try {
		await Item.findByIdAndUpdate(id, { deleted: true });
	} catch (error) {
		console.error("Error deleting item:", error);
		throw error;
	}
}

async function checkItem(id) {
	try{
		const item = await Item.findById(id);
		if (!item) {
			throw new Error("Item not found");
		}
		await Item.findByIdAndUpdate(id, { completed: !item.completed });
	} catch (error) {
		console.error("Error checking item:", error);
		throw error;
	}
}

export { getAllItems, getItemsByList, addItem, updateItem, deleteItem, getNameLists, checkItem };
