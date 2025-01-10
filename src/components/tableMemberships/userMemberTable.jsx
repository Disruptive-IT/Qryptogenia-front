import { useEffect, useState } from "react";
import ModalPayment, { fetchPayment, fetchUserMemberships, userMembershipsHeaders } from "./fetchMemberships";
import SearchBar from "../searchbar/searchbar";
import Paginator from "../UI/tables/paginator";

/*
 * @Author : Nicolas Barrios,   @date 2025-01-07 09:13:33
 * @description : tabla maestra de userMembership
 * @Props :
 * @return : vista de tabla con los registros
 */

export default function UserMemberTable() {
  const [userMember, setUserMember] = useState([]);
  const [payment, setPayment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSearch = (event) => setSearchQuery(event.target.value);

  const filteredUserMemberData = userMember.filter((queryMember) =>
    (queryMember?.user?.username || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (queryMember?.membership?.type_membership || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (queryMember?.user?.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (queryMember?.createdAt || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (queryMember?.limit_date || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    ((queryMember.state ? "active" : "inactive").includes(searchQuery.toLowerCase()))
  );

  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredUserMemberData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredUserMemberData.slice(startIndex, endIndex);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleclose = () => {
    setOpen(false);
    setPayment(null);
  };

  const handleGetPayment = async (payId) => {
    try {
      const infoPayment = await fetchPayment(payId);
      if (infoPayment) {
        setPayment(infoPayment);
        setOpen(true);
      } else {
        console.error("Payment data not found.");
      }
    } catch (error) {
      console.error("Error fetching payment:", error);
    }finally{
      console.log(payment);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserMemberships();
        setUserMember(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching memberships:", err);
        setError("Failed to load memberships data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading data...</h1>;
  }

  if (error) {
    return <h1 className="text-red-500">{error}</h1>;
  }

  return (
    <div className="overflow-x-auto">
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} placeholder="search user membership" />
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            {userMembershipsHeaders.map((element, index) => (
              <th key={index} className="py-2 px-4 border-b border-gray-300 text-xs sm:text-sm leading-5 text-gray-700">
                {element.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((element, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } border-b border-gray-200`}
            >
              <td className="border border-gray-300 px-4 py-2">{element.user?.username}</td>
              <td className="border border-gray-300 px-4 py-2">{element.membership?.type_membership}</td>
              <td className="border border-gray-300 px-4 py-2">{element.user?.email}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(element.createdAt).toLocaleDateString()}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(element.limit_date).toLocaleDateString()}</td>
              <td
                className={`border border-gray-300 px-4 py-2 ${
                  element.state ? "text-green-600" : "text-red-600"
                }`}
              >
                {element.state ? "Active" : "Inactive"}
              </td>
              <td>
                <button className="hover:underline" type="button" onClick={() => handleGetPayment(element?.payment_id)}>
                  Ver pago
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      {(open && payment) && (<ModalPayment data={payment} isOpen={open} setClose={handleclose} />)}
    </div>
  );
}
