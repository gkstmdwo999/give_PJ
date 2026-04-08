import { useState } from "react";
import { BottomNav } from "@/app/components/BottomNav";
import { TabBar } from "@/app/components/TabBar";
import { HomeHeader } from "./components/HomeHeader";
import { PostList } from "./components/PostList";
import { FloatingWriteButton } from "./components/FloatingWriteButton";

interface Post {
  id: string;
  type: "share" | "need";
  title: string;
  location: string;
  time: string;
  image?: string;
  status: "available" | "reserved" | "completed";
}

export function HomeScreen() {
  const [activeTab, setActiveTab] = useState<"all" | "share" | "need">("all");

  const mockPosts: Post[] = [
    {
      id: "1",
      type: "share",
      title: "새 옷 나눔합니다",
      location: "역삼동",
      time: "10분 전",
      status: "available",
      image: "https://images.unsplash.com/photo-1657878337917-48ec0248bdd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBjbG90aGVzfGVufDF8fHx8MTc3MDYxNzQwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "2",
      type: "need",
      title: "겨울 외투 필요해요",
      location: "삼성동",
      time: "1시간 전",
      status: "available",
      image: "https://images.unsplash.com/photo-1740442535747-6c292f995539?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBqYWNrZXQlMjBjbG90aGluZ3xlbnwxfHx8fDE3NzA1OTA1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "3",
      type: "share",
      title: "생활용품 나눔",
      location: "서초동",
      time: "2시간 전",
      status: "reserved",
      image: "https://images.unsplash.com/photo-1654064756910-974764816931?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZWhvbGQlMjBpdGVtc3xlbnwxfHx8fDE3NzA2MTc0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const tabs = [
    { id: "all", label: "전체" },
    { id: "share", label: "나눔해요" },
    { id: "need", label: "필요해요" },
  ];

  const filteredPosts = mockPosts.filter((post) => {
    if (activeTab === "all") return true;
    return post.type === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <HomeHeader />
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={(id) => setActiveTab(id as "all" | "share" | "need")} />
      <PostList posts={filteredPosts} />
      <FloatingWriteButton />
      <BottomNav />
    </div>
  );
}