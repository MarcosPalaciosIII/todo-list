const express = require("express");
const router = express.Router();
const Task = require("../models/Task.model");

router.get("/", (req, res) => {
	Task.find()
		.then((tasks) => {
			res.json({ success: true, data: tasks });
		})
		.catch((error) => {
			res.json({ success: false, error });
		});
});

router.get("/:taskId", (req, res) => {
	Task.findById(req.params.taskId)
		.then((task) => {
			res.json({ success: true, data: task });
		})
		.catch((error) => {
			res.json({ success: false, error });
		});
});

router.post("/:listId", (req, res) => {
	Task.create(req.body)
		.then((task) => {
			// res.json({ success: true, data: task });
			res.redirect(`/list/${req.params.listId}/${task._id}`);
		})
		.catch((error) => {
			res.json({ success: false, error });
		});
});

router.put("/:taskId", (req, res) => {
	Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true })
		.then((task) => {
			res.json({ success: true, data: task });
		})
		.catch((error) => {
			res.json({ success: false, error });
		});
});

router.delete("/:taskId/:listId", (req, res) => {
	Task.findByIdAndRemove(req.params.taskId)
		.then(() => {
			res.redirect(`/list/${req.params.listId}/${task._id}`);
			// res.json({
			// 	success: true,
			// 	data: {
			// 		message: `Successfully deleted task with ID: ${req.params.taskId}`,
			// 	},
			// });
		})
		.catch((error) => {
			res.json({ success: false, error });
		});
});

module.exports = router;
