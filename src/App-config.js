const CONFIG = {
    modalName: "bookEditModal",
    baseUrl: "http://localhost:4000/api/v1/books",
    searchUrl: "http://localhost:4000/api/v1/external/google/volumes",
    statusOptions: [
        {name: "None", value: "none"},
        {name: "Wishlist", value: "wishlist" },
        {name: "On Order", value: "onOrder"},
        {name: "Purchased", value: "purchased"},
        {name: "Reading", value: "reading"},
        {name: "Read", value: "read"}
        ],

    priorityOptions: [
        {name: "None", value: "none"},
        {name: "0", value: 0},
        {name: "1", value: 1},
        {name: "2", value: 2},
        {name: "3", value: 3},
        {name: "4", value: 4},
        {name: "5", value: 5}
    ]
}

export default CONFIG