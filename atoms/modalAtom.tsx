import { atom } from "recoil";



export const modalState = atom({    //globally available state
    key: "modalState",
    default: false,
})



export const postIdState = atom({    
    key: "postIdState",
    default: "",
})



export const communityIdState = atom({    
    key: "communityIdState",
    default: null,
})

