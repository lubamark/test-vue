export interface CheckboxItemInterface {
    id: number;
    parentId: number | any;
    name: string;
    checked: boolean;
    $children?: CheckboxItemInterface[];
    indeterminate?: boolean;
}
