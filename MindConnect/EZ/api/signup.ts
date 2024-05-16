import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../utils/serverPrisma";
import bcrypt from "bcryptjs";