const express = require("express");
const router = express.Router();
const List = require("../models/List.model");

router.get("/", (req, res) => {
	List.find()
		.then((lists) => {
			res.json({ success: true, data: lists });
		})
		.catch((error) => {
			res.json({ success: false, error });
		});
});

router.get("/:listId", (req, res) => {
	List.findById(req.params.listId)
		.populate("tasks")
		.then((list) => {
			res.json({ success: true, data: list });
		})
		.catch((error) => {
			res.json({ success: false, error });
		});
});

router.post("/", (req, res) => {
	List.create(req.body)
		.then((list) => {
			res.json({ success: true, data: list });
		})
		.catch((error) => {
			res.json({ success: false, error });
		});
});

router.put("/:listId", (req, res) => {
	List.findByIdAndUpdate(req.params.listId, req.body, { new: true })
		.then((list) => {
			res.json({ success: true, data: list });
		})
		.catch((error) => {
			res.json({ success: false, error });
		});
});

router.get("/:listId/:taskId", (req, res) => {
	List.findById(req.params.listId)
		.then((list) => {
			list.tasks.includes(req.params.taskId)
				? list.pull(req.params.taskId)
				: list.push(req.params.taskId);
			list.save();

			res.json({ success: true, data: list });
		})
		.catch((error) => {
			res.json({ success: false, error });
		});
});

router.delete("/:listId", (req, res) => {
	List.findByIdAndRemove(req.params.listId)
		.then(() => {
			res.json({
				success: true,
				data: {
					message: `Successfully deleted list with ID: ${req.params.listId}`,
				},
			});
		})
		.catch((error) => {
			res.json({ success: false, error });
		});
});

module.exports = router;
