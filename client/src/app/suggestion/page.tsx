// "use client";

// import {
//   CheckOutlined,
//   CloseCircleOutlined,
//   QuestionCircleOutlined,
// } from "@ant-design/icons";
// import dayjs from "dayjs";
// import { useEffect, useState } from "react";
// import { FaCheck, FaEdit, FaTimes, FaTrash, FaUserNinja } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { twMerge } from "tailwind-merge";
// import {
//   authData,
//   commentSuggestion,
//   downVoteSuggestion,
//   getToken,
//   upVoteSuggestion,
// } from "../../../api";
// import { showEditSuggestionModal } from "../../../redux/modals";
// import {
//   approveSuggestions,
//   deleteSuggestion,
//   rejectSuggestion,
// } from "../api/suggestions";
// import Button from "../components/Button";
// import CommentBox from "../components/CommentBox";
// import Comments from "../components/Comments";
// import Loading from "../components/Loading";
// import { VoteComponent } from "../components/SmallerComponents";
// import EditSuggestionModal from "../components/modals/EditSuggestionModal";
// import ModalComponent from "../components/modals/Modal";
// import useGetSuggestion from "../hooks/useGetSuggestion";
// import useApproveSuggestion from "../hooks/suggestion/useApproveSuggestion";
// import { statusColor } from "../hooks/useStatusColor";

// interface Props {
//   searchParams: {
//     id: string;
//     upVotes: [];
//     suggestion: string;
//     title: string;
//     suggester: string;
//     isAnonymous: string;
//     isAdmin: string;
//   };
// }

// export function icon(suggestion: {
//   status: string;
// }): import("react").ReactNode {
//   if (suggestion?.status?.toLowerCase() === "pending") {
//     return <QuestionCircleOutlined />;
//   } else if (suggestion?.status?.toLowerCase() === "approved") {
//     return <CheckOutlined />;
//   } else return <CloseCircleOutlined />;
// }

// const page = (props: Props) => {
//   const [comment, setComment] = useState("");
//   const [showActionModal, setShowActionModal] = useState(false);
//   const [btnTitle, setBtnTitle] = useState("");
//   const { loadingComments } = useSelector(
//     (state: { comments: { loadingComments: boolean } }) => state.comments
//   );

//   const id = props.searchParams.id;

//   const user = authData({ useSelector });
//   const token = getToken({ useSelector });
//   const { getSuggestion } = useGetSuggestion();
//   const { singleSuggestion: suggestion } = useSelector(
//     (state) => state.suggestions
//   );

//   const { approveSuggestion } = useApproveSuggestion({
//     id,
//     setShowActionModal,
//   });

//   const dispatch = useDispatch();

//   useEffect(() => {
//     getSuggestion(id);
//     console.log("ran through");
//     console.log(suggestion);
//   }, []);

//   const isAdmin = user?.isAdmin;

//   const handleSubmitComment = () => {
//     commentSuggestion({ id, comment, dispatch, token, setComment });
//   };

//   const handleUpVotesClick = () =>
//     upVoteSuggestion({
//       id: props.searchParams.id,
//       dispatch,
//       token,
//       userId: user._id,
//       upVotes: suggestion?.upVotes,
//     });

//   const handleDownVotesClick = () =>
//     downVoteSuggestion({
//       id: props.searchParams.id,
//       dispatch,
//       token,
//       userId: user._id,
//       downVotes: suggestion?.downVotes,
//     });

//   const actionButtonProps = [
//     {
//       btnTitle: "Approve",
//       color: "bg-green-500",
//       hoverColor: "hover:bg-green-800",
//       icon: <FaCheck />,
//       btnFunction: () => {
//         approveSuggestion();
//       },
//     },
//     {
//       btnTitle: "Reject",
//       color: "bg-orange-500",
//       hoverColor: "hover:bg-orange-800",
//       icon: <FaTimes />,
//     },
//   ];

//   function suggester(): import("react").ReactNode {
//     return suggestion?.isAnonymous ? (
//       <p className="flex items-center w-fit gap-1">
//         <span className="">
//           <FaUserNinja />
//         </span>
//         Anonymous
//       </p>
//     ) : (
//       suggestion?.user?.firstName + " " + suggestion?.user?.lastName
//     );
//   }

//   const Approve = () => {
//     return (
//       <div className="">
//         <p className="">
//           Approve this suggestion{" "}
//           <span className="text-primaryblue font-bold">
//             {suggestion?.title}?
//           </span>
//         </p>
//       </div>
//     );
//   };

//   const Reject = () => {
//     return (
//       <div className="">
//         <p className="">
//           Reject this suggestion{" "}
//           <span className="text-primaryblue font-bold">
//             {suggestion?.title}?
//           </span>
//         </p>
//       </div>
//     );
//   };

//   const Delete = () => {
//     return (
//       <div className="">
//         <p className="">
//           Delete this suggestion{" "}
//           <span className="text-primaryblue font-bold">
//             {suggestion?.title}?
//           </span>
//         </p>
//       </div>
//     );
//   };

//   const suggestionAction = () => {
//     if (btnTitle.toLowerCase() === "approve") {
//       return <Approve />;
//     } else if (btnTitle.toLowerCase() === "reject") {
//       return (
//         <div className="">
//           <Reject />
//         </div>
//       );
//     } else
//       return (
//         <div className="">
//           <Delete />
//         </div>
//       );
//   };

//   const handleActionBtnClick = () => {
//     if (btnTitle.toLowerCase() === "approve") {
//       approveSuggestion();
//     } else if (btnTitle.toLowerCase() === "reject") {
//       rejectSuggestion({ dispatch, token, id, setShowActionModal });
//     } else {
//       deleteSuggestion({ id, dispatch, token, router, setShowActionModal });
//     }
//   };

//   return (
//     <div className="py-24 px-4 grid gap-6 w-full">
//       {
//         //Modal
//       }
//       <ModalComponent
//         onCancel={() => setShowActionModal(false)}
//         children={suggestionAction()}
//         open={showActionModal}
//         footerActionBtnText={btnTitle}
//         title={<p>{btnTitle} Suggestion</p>}
//         onOk={() => handleActionBtnClick()}
//       />
//       <EditSuggestionModal
//         titleValue={suggestion?.title}
//         suggestionValue={suggestion?.suggestion}
//         anonymous={suggestion?.isAnonymous}
//       />
//       <div className="">
//         <p className="text-primaryblue font-bold text-[18px] capitalize flex items-center gap-2">
//           {suggestion?.title}{" "}
//           <span
//             className={twMerge(
//               "text-[14px] text-black px-2 rounded ml-2 flex items-center gap-1 w-fit",
//               statusColor(suggestion)
//             )}
//           >
//             {icon(suggestion)}
//             {suggestion?.status}
//           </span>
//         </p>
//         <p className="mt-2">{suggester()}</p>
//         <p className="text-[12px] text-gray-500 font-bold">
//           {dayjs(suggestion?.createdAt).format("DD.MM.YYYY")}
//         </p>
//       </div>
//       <div className="grid xl:grid-cols-3 gap-4">
//         <div className="xl:col-span-2 grid gap-4 h-fit">
//           <div className=" bg-white shadow rounded-md">
//             <div className="p-4">
//               <p className="">{suggestion?.suggestion}</p>
//               <VoteComponent
//                 upVotesClick={handleUpVotesClick}
//                 downVotesClick={handleDownVotesClick}
//                 upVotesLength={suggestion?.upVotes?.length}
//                 downVotesLength={suggestion?.downVotes?.length}
//                 upVotesConditionalStyle={
//                   suggestion?.upVotes?.includes(user?._id) && "text-primaryblue"
//                 }
//                 downVoteConditionalStyle={
//                   suggestion?.downVotes?.includes(user?._id) &&
//                   "text-primaryred"
//                 }
//               />
//             </div>
//             <div
//               className={twMerge(
//                 "admin-panel items-center justify-start gap-4 p-4 border-t border-bordercolor",
//                 isAdmin || user?._id === suggestion?.userId ? "flex" : "hidden"
//               )}
//             >
//               {isAdmin &&
//                 actionButtonProps.map((btnProp, index) => (
//                   <Button
//                     key={index}
//                     className={twMerge(
//                       `w-fit text-white rounded-lg px-3 py-1 text-[12px]`,
//                       btnProp.color,
//                       btnProp.hoverColor
//                     )}
//                     text={
//                       <span className="flex items-center gap-2">
//                         {btnProp.btnTitle} <span>{btnProp.icon}</span>
//                       </span>
//                     }
//                     disabled={
//                       suggestion?.status
//                         ?.toLowerCase()
//                         .includes(btnProp.btnTitle.toLowerCase()) ||
//                       (suggestion?.status?.toLowerCase() === "approved" &&
//                         btnProp.btnTitle.toLowerCase() === "delete")
//                     }
//                     onClick={() => {
//                       setShowActionModal(true);
//                       setBtnTitle(btnProp.btnTitle);
//                     }}
//                   />
//                 ))}

//               {(isAdmin || user?._id === suggestion?.userId) && (
//                 <Button
//                   className={twMerge(
//                     `w-fit text-white rounded-lg px-3 py-1 text-[12px] bg-red-500 hover:bg-red-700`
//                   )}
//                   text={
//                     <span className="flex items-center gap-2">
//                       Delete
//                       <FaTrash />
//                     </span>
//                   }
//                   disabled={suggestion?.status?.toLowerCase() === "approved"}
//                   onClick={() => {
//                     setShowActionModal(true);
//                     setBtnTitle("delete");
//                   }}
//                 />
//               )}
//               {user?._id === suggestion?.userId && (
//                 <Button
//                   className={twMerge(
//                     `w-fit text-white rounded-lg px-3 py-1 text-[12px] bg-primaryblue hover:bg-hoverblue`
//                   )}
//                   text={
//                     <span className="flex items-center gap-2">
//                       Edit <FaEdit />
//                     </span>
//                   }
//                   disabled={suggestion?.status.toLowerCase() === "approved"}
//                   onClick={() => dispatch(showEditSuggestionModal(suggestion))}
//                 />
//               )}
//             </div>
//           </div>
//           <CommentBox
//             placeholder={"Add comment"}
//             onchange={(e) => setComment(e.target.value)}
//             handleBtnClick={handleSubmitComment}
//             setComment={setComment}
//             comment={comment}
//           />
//           {loadingComments ? <Loading /> : <Comments suggestionId={id} />}
//         </div>

//         <div className="xl:col-span-1 h-fit xl:p-4 xl:pt-6 xl:bg-white xl:shadow rounded-md flex flex-col items-center gap-2 mt-6 xl:mt-0">
//           {/* <Avatar icon={<UserOutlined />} />
//           <p className="">{suggestion?.suggester}</p>
//           <p className="">
//             {suggestion?.isAdmin === "true" ? "Admin" : "Staff"}
//           </p> */}
//           <p className="text-primaryblue font-semibold text-left w-full inline-block">
//             Recent Suggestions
//           </p>
//           {/* <div className="w-full grid lg:grid-cols-2 xl:grid-cols-1 gap-3 mt-2">
//             {suggestions.map((s, index) => (
//               <Link
//                 href={{
//                   pathname: "/suggestion",
//                   query: {
//                     id: s?._id,
//                   },
//                 }}
//                 className="flex flex-col md:flex-row md:justify-between items-start md:items-center border-[1px] bg-white border-gray-200 rounded-lg py-2 px-4 hover:border-primaryblue duration-200"
//                 key={index}
//               >
//                 <p className="text-primaryblue font-semibold">
//                   {s?.title.slice(0, 20)}
//                   <span className="block font-normal text-sm text-gray-500">
//                     {s?.user?.firstName + " " + s?.user?.lastName}
//                   </span>
//                 </p>
//                 <span
//                   className={twMerge(
//                     "text-[14px] text-black px-2 rounded-full flex items-center gap-1 w-fit mt-2",
//                     statusColor(s)
//                   )}
//                 >
//                   {icon(s)}
//                   {s?.status}
//                 </span>
//               </Link>
//             ))}
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;

// export const getServerSideProps = (context: {
//   query: {
//     id: any;
//     downVotes: [];
//     upvotes: [];
//     isAdmin: boolean;
//     suggestion: string;
//     suggester: string;
//     isAnonymous: boolean;
//     title: string;
//     user: {};
//   };
// }) => {
//   return {
//     props: {
//       title: context.query.title,
//       suggester: context.query.suggester,
//       suggestion: context.query.suggestion,
//       isAnonymous: context.query.isAnonymous,
//       isAdmin: context.query.isAdmin,
//       upvotes: context.query.upvotes,
//       downVotes: context.query.downVotes,
//       id: context.query.id,
//     },
//   };
// };

import React from "react";

type Props = {};

const page = (props: Props) => {
  return <div className="p-24">page</div>;
};

export default page;
