"use client"

import { useState } from "react"

export default function UserProfile() {
  // Sample user data - in a real app, this would come from an API or props
  const [user, setUser] = useState({
    id: "1",
    name: "Sarah Johnson",
    username: "sarahj",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Product designer and UI/UX enthusiast. Love creating beautiful and functional interfaces that solve real problems.",
    occupation: "Senior Product Designer",
    joinDate: "January 2020",
    profilePicture: "/placeholder.svg?height=150&width=150",
    coverPhoto: "/placeholder.svg?height=200&width=800",
    skills: ["UI Design", "UX Research", "Prototyping", "Figma", "User Testing"],
    socialLinks: {
      twitter: "https://twitter.com/sarahj",
      linkedin: "https://linkedin.com/in/sarahj",
      dribbble: "https://dribbble.com/sarahj",
    },
  })

  return (
    // <div className="container w-full">
    //   <div className="bg-white rounded-lg shadow-md overflow-hidden">

    //     <div className="h-48 w-full relative">
    //       <img src={user.coverPhoto || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
    //       <div className="absolute bottom-0 transform translate-y-1/2 left-8">
    //         <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white">
    //           <img
    //             src={user.profilePicture || "/placeholder.svg"}
    //             alt={user.name}
    //             className="w-full h-full object-cover"
    //           />
    //         </div>
    //       </div>
    //       <div className="absolute top-4 right-4">
    //         <button className="bg-white/80 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-md text-sm font-medium flex items-center hover:bg-white transition-colors">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-4 w-4 mr-2"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    //             />
    //           </svg>
    //           Edit Profile
    //         </button>
    //       </div>
    //     </div>

    //     <div className="pt-16 pb-4 px-6">
    //       <div className="flex justify-between items-start">
    //         <div>
    //           <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
    //           <p className="text-gray-500">@{user.username}</p>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="px-6 pb-6 space-y-6">
    //       {/* Bio */}
    //       <div>
    //         <p className="text-sm text-gray-600">{user.bio}</p>
    //       </div>

    //       {/* Contact Information */}
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //         <div className="flex items-center gap-2">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-4 w-4 text-gray-500"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    //             />
    //           </svg>
    //           <span className="text-sm">{user.email}</span>
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-4 w-4 text-gray-500"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    //             />
    //           </svg>
    //           <span className="text-sm">{user.phone}</span>
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-4 w-4 text-gray-500"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    //             />
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    //             />
    //           </svg>
    //           <span className="text-sm">{user.location}</span>
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-4 w-4 text-gray-500"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    //             />
    //           </svg>
    //           <span className="text-sm">{user.occupation}</span>
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-4 w-4 text-gray-500"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    //             />
    //           </svg>
    //           <span className="text-sm">Joined {user.joinDate}</span>
    //         </div>
    //       </div>

    //       <hr className="border-gray-200" />

    //       {/* Skills */}
    //       <div>
    //         <h3 className="text-sm font-medium mb-2 text-gray-700">Skills</h3>
    //         <div className="flex flex-wrap gap-2">
    //           {user.skills.map((skill, index) => (
    //             <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
    //               {skill}
    //             </span>
    //           ))}
    //         </div>
    //       </div>

    //       <hr className="border-gray-200" />

    //       {/* Social Links */}
    //       <div>
    //         <h3 className="text-sm font-medium mb-2 text-gray-700">Connect</h3>
    //         <div className="flex gap-2">
    //           {Object.entries(user.socialLinks).map(([platform, url]) => (
    //             <a
    //               key={platform}
    //               href={url}
    //               target="_blank"
    //               rel="noopener noreferrer"
    //               className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
    //             >
    //               {platform.charAt(0).toUpperCase() + platform.slice(1)}
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 className="inline-block ml-1 h-3 w-3"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 stroke="currentColor"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   strokeWidth={2}
    //                   d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    //                 />
    //               </svg>
    //             </a>
    //           ))}
    //         </div>
    //       </div>
    //     </div>

    //     <div className="border-t bg-gray-50 px-6 py-4 flex justify-between">
    //       <div className="text-xs text-gray-500">Last updated: March 1, 2024</div>
    //       <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors">
    //         View Full Profile
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full h-full text-black flex flex-col items-center justify-center">

      <h3>Coming soon....</h3>
    </div>
  )
}

