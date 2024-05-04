export enum SortKey {
    CreationTime,
    Name,
}

export enum SortOrder {
    Ascending,
    Descending,
}

export enum ClickAction {
    ViewDetails,
    Select,
}

export type Settings = {
    sortKey: SortKey,
    sortOrder: SortOrder,
    clickAction: ClickAction,
    searchQuery: string,
};