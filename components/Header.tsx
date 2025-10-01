"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-4">
      {/* Logo + Institute Name */}
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Imperial Gemological Institute of India"
          width={40}
          height={40}
        />
        <div>
          <Link
            href="/admin"
            className="text-sm font-bold leading-tight text-black hover:text-blue-600 transition"
          >
            <h1 className="text-sm font-bold leading-tight text-black">
              IMPERIAL GEMOLOGICAL <br />
              INSTITUTE OF INDIA
            </h1>
          </Link>
        </div>
      </div>

      {/* Center Title */}
      <h2 className="text-lg font-semibold text-black">
        TEST REPORT GENERATOR
      </h2>

      {/* Admin Dropdown */}
      <div className="relative">
        <button
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-900 rounded-full hover:bg-gray-200"
          onClick={() => setOpen(!open)}
        >
          <span>Admin</span>
          <span>⚫</span>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md">
            <button className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-100">
              Profile
            </button>
            <button className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-100">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Group, Text, Menu, Button, Box, Paper } from "@mantine/core";

// export default function Header() {
//   const [open, setOpen] = useState(false);

//   return (
//     <Paper shadow="sm" px="md" withBorder h={70}>
//       <Group justify="space-between" h="100%">
//         {/* Logo + Institute Name */}
//         <Group gap="sm">
//           <Image
//             src="/logo.png"
//             alt="Imperial Gemological Institute of India"
//             width={40}
//             height={40}
//           />
//           <Box>
//             <Text size="sm" fw={700} lh={1} c="dark">
//               IMPERIAL GEMOLOGICAL <br />
//               INSTITUTE OF INDIA
//             </Text>
//           </Box>
//         </Group>

//         {/* Center Title */}
//         <Text size="lg" fw={600} c="dark">
//           TEST REPORT GENERATOR
//         </Text>

//         {/* Admin Dropdown */}
//         <Menu
//           opened={open}
//           onClose={() => setOpen(false)}
//           onOpen={() => setOpen(true)}
//           position="bottom-end"
//           width={160}
//         >
//           <Menu.Target>
//             <Button
//               variant="default"
//               radius="xl"
//               onClick={() => setOpen((prev) => !prev)}
//             >
//               <Group gap="xs">
//                 <Text>Admin</Text>
//                 <Text>⚫</Text>
//               </Group>
//             </Button>
//           </Menu.Target>
//           <Menu.Dropdown>
//             <Menu.Item>Profile</Menu.Item>
//             <Menu.Item color="red">Logout</Menu.Item>
//           </Menu.Dropdown>
//         </Menu>
//       </Group>
//     </Paper>
//   );
// }
