// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";

interface IGetClassOption {
  baseName: string;
  student: string;
}
interface IGetStudentsOption {
  baseName: string;
  recordId: string;
}

const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
const baseKey = process.env.NEXT_PUBLIC_BASE_KEY as string;

const base = new Airtable({ apiKey }).base(baseKey);

export const getClass = ({ baseName, student }: IGetClassOption) => {
  return base(baseName)
    .select({
      filterByFormula: `SEARCH("${student}", {Students})`,
    })
    .firstPage();
};

const getStudentById = async (id: string) => {
  // return await base("Students")
  //   .find(id)
  //   .then((value) => value);
  base("Students").find(id, function (err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Retrieved", record.id);
    return record;
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const student = JSON.parse(req.body);
  const data = await getClass({ baseName: "Classes", student: "Sid" });
  const result: any[] = [];
  const [{ fields: res1 }, { fields: res2 }] = data;
  await [res1, res2].forEach(async (item) => {
    const students = await item.Students.map(async (value: string) => {
      return setTimeout(async () => {
        const student = await getStudentById(value);
        // console.log(student.fields);
        // return await Promise.resolve(student);
        console.log(student.fields);
        return Promise.resolve(student);
      }, 500);
    });
    await result.push({
      ...item,
      students: await Promise.all(students).then((value) => value),
    });
  });
  console.log(result);
  res.json(result);
}
