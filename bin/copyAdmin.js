#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Copies a directory recursively from source to destination.
 * @param {string} source - The source directory path.
 * @param {string} destination - The destination directory path.
 */
async function copyDirectory(source, destination) {
    try {
        await fs.promises.cp(source, destination, { recursive: true });
        console.log(`Successfully copied from "${source}" to "${destination}".`);
    } catch (err) {
        throw new Error(`Failed to copy directory: ${err.message}`);
    }
}

/**
 * Main function to execute the copy operation.
 */
async function main() {
    // Retrieve environment variables
    const sourcePathEnv = process.env.ADMIN_SOURCE_PATH;
    const destinationPathEnv = process.env.ADMIN_PATH;

    if (!sourcePathEnv || !destinationPathEnv) {
        console.error('Error: SOURCE_PATH and DESTINATION_PATH must be defined in the environment variables.');
        process.exit(1);
    }

    // Resolve absolute paths
    const sourcePath = path.resolve(__dirname, '..', sourcePathEnv);
    const destinationPath = path.resolve(__dirname, '..', destinationPathEnv);

    try {
        // Check if the source directory exists
        if (!fs.existsSync(sourcePath)) {
            throw new Error(`Source path "${sourcePath}" does not exist.`);
        }

        // Check if the destination directory exists
        if (fs.existsSync(destinationPath)) {
            throw new Error(`Destination path "${destinationPath}" already exists.`);
        }

        // Create the destination directory
        await fs.promises.mkdir(destinationPath, { recursive: true });
        console.log(`Created destination directory "${destinationPath}".`);

        // Copy the source directory to the destination
        await copyDirectory(sourcePath, destinationPath);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

// Execute the main function
main();
