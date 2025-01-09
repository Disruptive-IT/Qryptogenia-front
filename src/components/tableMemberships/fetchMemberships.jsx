import instance from "../../libs/axios"
import ModalComponent from "../discounts/form/modal";

export const fetchUserMemberships=async()=>{
    try{
    const response=await instance.get('/admin/getMemberships');
    return response.data;
}catch(error){
        console.error("error getting memberships information")
    }
}

export const fetchPayment=async(paymentId)=>{
    try {
        const payments=await instance.get(`/admin/infoPayment/${paymentId}`);
        const response=(await payments).data;
        return response;
    } catch (error) {
        console.error("error fetching payments: ",error.message);
        return {message:"error fetching payment",error:error.message};
    }
}

export const userMembershipsHeaders=[
    {header:'username'},
    {header:'plan'},
    {header:'user email'},
    {header:'start date'},
    {header:'limit date'},
    {header:'state'},
    {header:'payment'}
]

export default function ModalPayment({data,isOpen,setClose}){
    return(
<ModalComponent isOpen={isOpen} onClose={setClose}>
  <div className="bg-transparent m-1  overflow-auto w-auto m-auto p-2 rounded shadow-md">
    <button type="button" onClick={()=>{setClose()}} className="bg-red-600 mx-[48%] my-2 p-1 rounded-xl text-white">cerrar</button>
    <table className="border-4 border-light-blue rounded-md mx-auto border-collapse border border-gray-300 text-left">
      <tbody>
        {data &&
          Object.entries(data).map(([key, value], index) => (
            <tr key={index} className="border-2 border-light-blue  odd:bg-white even:bg-gray-50">
              <td className="border-2 border-light-blue border-collapse  px-4 py-2 border text-2xl border-gray-300">
                {key.replace(/_/g, ' ')}
              </td>
              <td className="border-2 border-light-blue  px-4 py-2 border text-2xl border-gray-300">
                {typeof value === 'string' && value.includes('_')
                  ?(key=='payer_email') ? value.replace(/_/g,'') : value.replace(/_/g, ' ')
                  : value}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
</ModalComponent>
    )
}