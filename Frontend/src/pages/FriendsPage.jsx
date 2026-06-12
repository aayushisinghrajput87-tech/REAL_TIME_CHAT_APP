import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
// import Layout from "../components/Layout";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["friendsList"],
		queryFn: getUserFriends,
	});

	return (
		<div className="max-w-2xl mx-auto py-8 px-2">
			<h2 className="text-2xl font-bold mb-6">My Friends</h2>
			{isLoading ? (
				<div className="flex justify-center items-center h-32">Loading...</div>
			) : isError ? (
				<div className="text-red-500">Failed to load friends.</div>
			) : Array.isArray(data) && data.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
					{data.map(friend => (
						<FriendCard key={friend._id} friend={friend} />
					))}
				</div>
			) : (
				<NoFriendsFound />
			)}
		</div>
	);
};

export default FriendsPage;
