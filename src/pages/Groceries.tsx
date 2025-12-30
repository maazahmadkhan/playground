import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2, ArrowUp } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffectOnce } from "@/hooks/use-effect-once";
import { getGroceriesApi, setGroceriesApi } from "@/lib/db/groceries";

const GroceryList = () => {
  useEffectOnce(() => {
    const onMount = async () => {
      const res: string = await getGroceriesApi();
      if (res) {
        groceriesState[1](res.split(","));
      }
    };
    onMount();
  });

  const groceriesState = useState<string[]>([]);
  const groceries = groceriesState[0];
  const setGroceries = (groceries: string[]) => {
    groceriesState[1](groceries);
    setGroceriesApi(groceries.join(","));
  };

  const [newGrocery, setNewGrocery] = useState<string>("");
  const [groceryToDelete, setGroceryToDelete] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addGrocery = () => {
    if (!newGrocery.trim()) return;
    setGroceries([...groceries, newGrocery]);
    setNewGrocery("");
  };

  const confirmDelete = (grocery: string) => {
    setGroceryToDelete(grocery);
    setIsDialogOpen(true);
  };

  const deleteGrocery = () => {
    if (groceryToDelete) {
      setGroceries(groceries.filter((g) => g !== groceryToDelete));
      setGroceryToDelete("");
      setIsDialogOpen(false);
    }
  };

  const editGrocery = (grocery: string) => {
    const newText = prompt("Edit grocery:");
    if (newText !== null) {
      setGroceries(groceries.map((g) => (g === grocery ? newText : g)));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Groceries</h1>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Add a new grocery..."
          value={newGrocery}
          onChange={(e) => setNewGrocery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addGrocery()}
        />
        <Button onClick={addGrocery}>Add</Button>
      </div>

      <ul className="space-y-2">
        <AnimatePresence>
          {groceries.map((grocery) => (
            <motion.li
              key={grocery}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-md shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-2">
                <span className="break-all">{grocery}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editGrocery(grocery)}
                >
                  <Edit2 size={16} />
                </Button>
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => confirmDelete(grocery)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete:{" "}
                        <strong>{groceryToDelete}</strong>?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={deleteGrocery}>
                        Delete
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button onClick={scrollToTop} className="rounded-full p-3">
            <ArrowUp size={20} />
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GroceryList;
