import { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";

interface IGetStudentsOption {
  baseName: string;
  recordId: string;
}
const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
const baseKey = process.env.NEXT_PUBLIC_BASE_KEY as string;

const base = new Airtable({ apiKey }).base(baseKey);

const findCourses = async (id: string) => {
  return await base("Students").find(id);
};

/* Find a Record using a string */
export const getStudents = async ({
  baseName,
  recordId,
}: IGetStudentsOption) => {
  const course = await base(baseName).find(recordId);
  const studentIds = course.fields.Students;
  const students =
    studentIds && studentIds.map((studentId: string) => findCourses(studentId));
  console.log(students);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  getStudents({
    baseName: "Classes",
    recordId: "recJKCgej9ihrL2pK",
  }).then((data) => res.json(data));
}
