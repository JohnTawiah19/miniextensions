// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Airtable, { FieldSet, Records } from "airtable";

interface IGetClassOption {
  baseName: string;
  student: string;
}
interface IGetStudentsOption {
  baseName: string;
  recordIds: string[] | any;
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

export const getStudentById = ({
  baseName,
  recordIds,
}: IGetStudentsOption): Promise<Records<FieldSet>> | any => {
  const students = Promise.all(
    recordIds.map(async (id) => {
      const response = await base(baseName).find(id);
      const data = response;
      return data.fields;
    })
  );
  return students;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const student = JSON.parse(req.body.student);
  console.log(JSON.parse(req.body));
  const data = await getClass({ baseName: "Classes", student: "Sid" });

  const response = await Promise.all(
    data.map(async (item) => {
      const record = [item.fields.Students];
      const getStudents = await Promise.all(
        record?.map(async (recordIds: string[]) => {
          const student = await getStudentById({
            baseName: "Students",
            recordIds,
          });
          return student;
        })
      );
      const students = getStudents.flatMap((item) => item);

      return {
        name: item.fields.Name,
        students: students.map((item) => item.Name),
      };
    })
  );
  res.json(response);
}
