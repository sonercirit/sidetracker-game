/*
  Warnings:

  - The `board` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "player2Id" DROP NOT NULL,
DROP COLUMN "board",
ADD COLUMN     "board" JSONB NOT NULL DEFAULT '[["_", "_", "_", "_", "_", "_", "_"], ["_", "_", "_", "_", "_", "_", "_"], ["_", "_", "_", "_", "_", "_", "_"], ["_", "_", "_", "_", "_", "_", "_"], ["_", "_", "_", "_", "_", "_", "_"], ["_", "_", "_", "_", "_", "_", "_"], ["_", "_", "_", "_", "_", "_", "_"]]';
