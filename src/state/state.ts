export interface DialogProps {
    pathDialog?: string
    name?: string
    id?: number
    description?: string
}


export const dialog: Array<DialogProps> = [
    {pathDialog: '/dialogs/1', name: 'Vasil', id: 1, description: 'Hi how are you doing'},
    {pathDialog: '/dialogs/2', name: 'Vlad', id: 2, description: 'I heard that you have problems'},
    {pathDialog: '/dialogs/3', name: 'Max', id: 3, description: 'how is your health today'},
    {pathDialog: '/dialogs/4', name: 'Bogdan', id: 4, description: 'Where had you been?'},
]

