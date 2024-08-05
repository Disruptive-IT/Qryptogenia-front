import { useFormik } from "formik";

const CreateDiscount=()=>{

    const initialValues={
        discount:0,
        description:"",
        limit_date:new Date().toISOString,
        state: true
    };

    const validate=(values)=>{
        if(!values.discount){
            errors.discount="Required discount value";
        }else if(values.discount.length()<=0){
            errors.discount="you cannot create a discount equal to zero";
        }

        if(!values.description){
            errors.description="Required";
        }

        if(values.limit_date==new Date().toISOString){
            errors.limit_date="the limit date cannot be the currently one, please change date";
        }

        return errors;
    }

    const formik=useFormik({
        initialValues:{initialValues},
        validate,
        onsubmit: (values)=>{
            alert(JSON.stringify(values, null, 2));
        },
    })

    return(
<form
    className="bg-slate-100 my-3 mx-auto p-6 max-w-md rounded-lg shadow-md"
    onSubmit={formik.handleSubmit}
>
    <div className="mb-6">
        <label className="block text-sm font-semibold mb-2" htmlFor="discount">
            Discount
        </label>
        <input
            className="w-full p-3 text-sm text-gray-800 border border-cyan-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            type="number"
            name="discount"
            id="discount"
            onChange={formik.handleChange}
            value={formik.values.discount}
        />
        {formik.errors.discount ? (
            <div className="text-red-500 text-xs mt-1">{formik.errors.discount}</div>
        ) : null}
    </div>

    <div className="mb-6">
        <label className="block text-sm font-semibold mb-2" htmlFor="description">
            Description
        </label>
        <input
            className="w-full p-3 text-sm text-gray-800 border border-cyan-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            type="text"
            name="description"
            id="description"
            onChange={formik.handleChange}
            value={formik.values.description}
        />
        {formik.errors.description ? (
            <div className="text-red-500 text-xs mt-1">{formik.errors.description}</div>
        ) : null}
    </div>

    <div className="mb-6">
        <label className="block text-sm font-semibold mb-2" htmlFor="limit_date">
            Limit Date
        </label>
        <input
            className="w-full p-3 text-sm text-gray-800 border border-cyan-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            type="date"
            name="limit_date"
            id="limit_date"
            onChange={formik.handleChange}
            value={formik.values.limit_date}
        />
        {formik.errors.limit_date ? (
            <div className="text-red-500 text-xs mt-1">{formik.errors.limit_date}</div>
        ) : null}
    </div>

    <div className="flex justify-center">
        <button
            type="submit"
            className="px-6 py-2 bg-[#007bff] text-white text-sm font-semibold rounded-lg  focus:outline-none focus:ring-2 "
        >
            Submit
        </button>
    </div>
</form>

    )
}

export default CreateDiscount