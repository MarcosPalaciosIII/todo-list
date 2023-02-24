const { Schema, model } = require("mongoose");

const listSchema = new Schema(
	{
		tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
		author: { type: Schema.Types.ObjectId, ref: "User" },
		dueDate: Date,
		title: String,
		complete: Boolean,
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const List = model("List", listSchema);

module.exports = List;
