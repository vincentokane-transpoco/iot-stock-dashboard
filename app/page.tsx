"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";

type InventoryItem = {
  id: number;
  name: string;
  quantity: number;
  reorderPoint: number;
  supplier: string;
};

const mockData: InventoryItem[] = [
  { id: 1, name: "Resistor 10k", quantity: 120, reorderPoint: 100, supplier: "ABC Electronics" },
  { id: 2, name: "Capacitor 100uF", quantity: 45, reorderPoint: 50, supplier: "XYZ Components" },
  { id: 3, name: "Microcontroller ATmega328", quantity: 20, reorderPoint: 30, supplier: "MicroDev Inc." },
];

export default function Dashboard() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    setInventory(mockData);
  }, []);

  const lowStockItems = inventory.filter(item => item.quantity <= item.reorderPoint);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">IoT Component Inventory</h1>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl mb-4">Current Stock</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Component</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Reorder Point</TableCell>
                <TableCell>Supplier</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id} className={item.quantity <= item.reorderPoint ? "bg-red-100" : ""}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.reorderPoint}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {lowStockItems.length > 0 && (
        <Card className="border-red-500">
          <CardContent className="p-4">
            <h2 className="text-xl text-red-600 font-semibold mb-2">Low Stock Alerts</h2>
            <ul className="list-disc list-inside">
              {lowStockItems.map(item => (
                <li key={item.id}>{item.name} is below reorder point ({item.quantity} in stock)</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
