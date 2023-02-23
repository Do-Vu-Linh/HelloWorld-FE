export interface Page<E>{
    content : E[];
    pageable : Pageable;
    last : boolean;
    totalElements : number;
    totalPages : number;
    size : number;
    number : number;
    sort : Sort;
    numberOfElements : number;
    first : boolean;
    empty : boolean;
}
export interface Sort{
    empty : boolean;
    sorted : boolean;
    unsorted : boolean;
}
export interface Pageable{
    sort : Sort;
    offset : number;
    pageNumber : number;
    pageSize : number;
    paged : boolean;
    unpaged : boolean;
}
