import { FaShieldAlt } from "react-icons/fa";
import { IoGitMergeSharp } from "react-icons/io5";
import { BiError } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";
import { BsStack } from "react-icons/bs";

//writing the static array to fill data
export const array = [
  {
    icon: (
      <FaShieldAlt
        className="text-brand-tertionary rounded-md bg-[#eef2ff] p-3"
        size={45}
      />
    ),
    num: 1,
    color: "text-[#4f46e5]",
    name: "Evidence Strength",
    details:
      "Evaluates the quality and reliability of claims made within a tweet — distinguishing between anecdotal references, data-driven assertions, and unsupported statements about gender-related topics.",
  },
  {
    icon: (
      <IoGitMergeSharp
        className="text-[#059669] rounded-md bg-[#f8fafc] p-3"
        size={45}
      />
    ),
    num: 2,
    color: "text-[#059669]",
    name: "Logical Consistency",
    details:
      "Measures whether the argument structure within a tweet is internally coherent — detecting contradictions, logical fallacies, or leaps in reasoning related to gender discourse.",
  },
  {
    icon: (
      <BiError
        className="text-[#f97316] rounded-md bg-[#fff7ed] p-3"
        size={45}
      />
    ),
    num: 3,
    color: "text-[#f97316]",
    name: "Generalization Risk",
    details:
      "Identifies the degree to which a tweet inappropriately applies broad, sweeping claims about gender groups — flagging stereotyping, overgeneralization, and the erasure of individual variation.",
  },
  {
    icon: (
      <IoMdSearch
        className="text-[#f43f5e] rounded-md bg-[#fff1f2] p-3"
        size={45}
      />
    ),
    num: 4,
    color: "text-[#f43f5e]",
    name: "Confirmation Bias",
    details:
      "Detects the tendency to selectively emphasize information that confirms pre-existing beliefs about gender, while ignoring or dismissing contradictory evidence within the tweet's framing.",
  },
  {
    icon: (
      <BsStack
        className="text-[#8b5cf6] rounded-md bg-[#f5f3ff] p-3"
        size={45}
      />
    ),
    num: 5,
    color: "text-[#8b5cf6]",
    name: "Nuance & Context",
    details:
      "Assesses how well the tweet acknowledges complexity — considering historical context, intersectionality, power dynamics, and the multifaceted realities of gender. High nuance scores reflect thoughtful, well-contextualized communication that avoids reductive framings.",
  },
];
