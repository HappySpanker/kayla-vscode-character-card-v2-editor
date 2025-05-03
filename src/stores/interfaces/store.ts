export interface Store<T> {

    /**
     * Retrieve an array or a Thenable of an array of T
     */
    Retrieve() : T[] | Thenable<T[]>;

}