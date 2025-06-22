import { PrioritizedEnum } from "../../models/enums/PrioritizedEnum"

export type CreateTodoRequestModel = {
        userId: string,
        deadline: string,
        description: string,
        prioritized: PrioritizedEnum,
        title: string
}