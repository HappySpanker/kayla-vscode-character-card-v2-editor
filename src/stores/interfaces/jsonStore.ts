export interface JsonStore<T> {

    retrieve() : T[] | Thenable<T[]>;

}