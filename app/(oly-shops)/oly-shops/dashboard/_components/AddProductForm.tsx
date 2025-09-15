"use client";
import { Label } from "@/components/ui/label";
import style from "./AddProductForm.module.scss";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { formatPrice } from "@/utils/formatterFunctions/Formatter";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/Buttons";
import { AddProductAction } from "../_actions/products";
import SubmitButton from "./SubmitButton";

interface AddProductFormProps {}

const AddProductForm = ({}: AddProductFormProps) => {
  
  const [priceInCents, setPriceInCents] = useState<number>();
  return (
    <form action={AddProductAction}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
      </div>
      <div>
        <Label htmlFor="priceInCents">Price in cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          value={priceInCents || ""}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required />
      </div>
      <div>
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required />
      </div>
      <div>
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required />
      </div>
      <div className={style.priceInRands}>
        {formatPrice((priceInCents || 0) / 100, {
          showCents: false,
          formatThousands: false,
        })}
      </div>
        <SubmitButton />
    </form>
  );
};

export default AddProductForm;
