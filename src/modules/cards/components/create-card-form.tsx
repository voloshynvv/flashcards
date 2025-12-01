import { CirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const CreateCardForm = () => {
  return (
    <form className="shadow-border-lg rounded-2xl border bg-neutral-50 p-5 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4">
        <FormField htmlFor="question" label="Question">
          <Input
            id="question"
            placeholder="e.g., What is the capital of France?"
          />
        </FormField>

        <FormField htmlFor="answer" label="Answer">
          <Textarea id="answer" placeholder="e.g., Paris" />
        </FormField>

        <FormField label="Category" htmlFor="geography">
          <Input id="geography" placeholder="e.g., Geography" />
        </FormField>
      </div>

      <Button>
        <CirclePlus />
        Create Card
      </Button>
    </form>
  );
};
