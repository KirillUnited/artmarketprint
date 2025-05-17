import React from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@heroui/table';
import { maleSizes, femaleSizes } from '../../../config/productSizeDataConfig';

interface SizeData {
  international: string;
  russian: number;
  chest: string;
  waist: string;
  hips: string;
}

interface ProductSizeTableProps {
  gender: 'male' | 'female';
}

const ProductSizeTable: React.FC<ProductSizeTableProps> = ({ gender }) => {
  const sizes = gender === 'male' ? maleSizes : femaleSizes;

  return (
    <Table aria-label="Product Size Table" radius='sm' className='border-1 border-gray-300 rounded-small min-w-fit'>
      <TableHeader>
        <TableColumn>Международный</TableColumn>
        <TableColumn>СНГ</TableColumn>
        <TableColumn>Грудь (см)</TableColumn>
        <TableColumn>Талия (см)</TableColumn>
        <TableColumn>Бёдра (см)</TableColumn>
      </TableHeader>
      <TableBody>
        {sizes.map((size, index) => (
          <TableRow key={index}>
            <TableCell>{size.international}</TableCell>
            <TableCell>{size.russian}</TableCell>
            <TableCell>{size.chest}</TableCell>
            <TableCell>{size.waist}</TableCell>
            <TableCell>{size.hips}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductSizeTable;