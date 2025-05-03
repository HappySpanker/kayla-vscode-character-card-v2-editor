export interface Store<T> {

    retrieve() : T[] | Thenable<T[]>;

}