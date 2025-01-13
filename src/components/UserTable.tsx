import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { UserInfo } from "../types/userInfo";

function UserTable({ tableData }: { tableData: Array<UserInfo> }) {
  function createTableHeaders(data: Array<UserInfo>): string[] {
    if (data && data.length) {
      const headers = Object.keys(data[0]);
      return headers.filter(
        (header) =>
          header !== "id" && header !== "address" && header !== "company"
      );
    }
    return [];
  }

  const tableHeaders = createTableHeaders(tableData);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders?.map((header) => (
                <TableCell key={header}>
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, i) => (
              <TableRow key={row.id}>
                {/* {tableHeaders.map(header => ( */}
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.phone}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.website}
                </TableCell>
                {/* ))} */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default UserTable;
