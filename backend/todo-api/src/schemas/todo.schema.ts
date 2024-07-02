import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'todoList' })
export class UserToDo {

    @Prop({ unique: true, required: true })
    username: string;

    @Prop({ required: true })
    todoLists: ToDo[];
}

@Schema()
export class ToDo {

    @Prop({ unique: true, required: true })
    name: string;

    @Prop({ required: true })
    items: Task[];
}

@Schema()
export class Task {
    @Prop({ unique: true, required: true })
    text: string;

    @Prop({ default: false })
    completed: boolean;
}

export const ToDoSchema = SchemaFactory.createForClass(UserToDo);