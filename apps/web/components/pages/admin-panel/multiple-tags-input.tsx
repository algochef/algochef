import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CompanyTag, Tag } from '@repo/types/problem'
import { IconX } from '@tabler/icons-react'
import React, { useState } from 'react'
import slugify from "slugify";

type TagType = Tag | CompanyTag;

const MultipleTagsInput = (
    {
        tags,
        onTagChange,
        tagType = "topic"
    }: {
        tags?: TagType[],
        onTagChange: (payload: { type: string, name: string, slug: string, tagType: string }) => void,
        tagType?: string
    }) => {
    const [text, setText] = useState("");

    const handleAddTag = () => {
        onTagChange({
            tagType,
            type: "add",
            name: text,
            slug: slugify(text, {
                lower: true,
                locale: "en"
            }),
        });
        setText("");
    };
    const handleRemoveTag = (tag: Tag) => {
        console.log("remove", tag)
        onTagChange({
            tagType,
            ...tag,
            type: "remove",
        })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setText(ev.target.value);
    };

    return (
        <div className="grid gap-3">
            <Label htmlFor="tags">{tagType==="topic"?"Topic Tags":"Company Tags"}</Label>

            <div className="relative">
                <Input
                    id="tags"
                    name="tags"
                    value={text}
                    placeholder="Add tags and press Enter"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className='text-sm'
                />

                {text.trim() && (
                    <div
                        className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-muted-foreground cursor-pointer z-10 shadow"
                        onClick={handleAddTag}
                    >
                        Add "<span className="font-medium">{text.trim()}</span>"
                    </div>
                )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
                {tags && tags.map(tag => (
                    <span
                        key={tag.slug}
                        className="bg-gradient-to-t from-blue-300/50 to-blue-50 rounded-md px-1.5 py-0.5 border-blue-300 border-[1px] text-xs flex items-center gap-1"
                    >
                        {tag.name}
                        <IconX
                            size={14}
                            className="cursor-pointer hover:text-red-500"
                            onClick={() => handleRemoveTag(tag)}
                        />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MultipleTagsInput;