import instance from "../../libs/axios"

export const fetchUserMemberships=async()=>{
    try{
    const response=await instance.get('/admin/getMemberships');
    return response.data;
}catch(error){
        console.error("error getting memberships information")
    }
}

export const userMembershipsHeaders=[
    {header:'username'},
    {header:'plan'},
    {header:'user email'},
    {header:'start date'},
    {header:'limit date'},
    {header:'state'}
]