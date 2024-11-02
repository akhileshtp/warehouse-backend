import mongoose, { Schema } from 'mongoose';

const TaskSchema = mongoose.Schema(
    {
        warehouse: {
            type: String,
            required: true
        },
        block: {
            type: String,
            required: true
        },
        stack: {
            type: Number,
            required: true
        },
        task: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            default: 'Pending',  // Default status is set to "Pending"
            enum: ['Pending', 'Completed']  // Optional: restricts status to specific values
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Task", TaskSchema);
