import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminAddProducts from "./AdminAddProducts";

describe("AdminAddProducts Component", () => {
  test("renders Add Product title", () => {
    render(<AdminAddProducts />);
    const titleElement = screen.getByText(/Add Product/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("allows entering product name", () => {
    render(<AdminAddProducts />);
    const productNameInput = screen.getByPlaceholderText("product name");
    fireEvent.change(productNameInput, { target: { value: "Test Product" } });
    expect(productNameInput.value).toBe("Test Product");
  });

  test("renders Add Product title", () => {
    const titleElement = screen.getByText(/Add Product/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("allows entering product name", () => {
    const productNameInput = screen.getByPlaceholderText("product name");
    fireEvent.change(productNameInput, { target: { value: "Test Product" } });
    expect(productNameInput.value).toBe("Test Product");
  });

  test("allows selecting category", () => {
    const categorySelect = screen.getByLabelText("Category");
    fireEvent.change(categorySelect, { target: { value: "Test Category" } });
    expect(categorySelect.value).toBe("Test Category");
  });

  test("allows selecting sub-category", () => {
    const subCategorySelect = screen.getByLabelText("Sub-category");
    fireEvent.change(subCategorySelect, {
      target: { value: "Test Subcategory" },
    });
    expect(subCategorySelect.value).toBe("Test Subcategory");
  });

  test("allows entering quantity", () => {
    const quantityInput = screen.getByPlaceholderText("quantity");
    fireEvent.change(quantityInput, { target: { value: "10" } });
    expect(quantityInput.value).toBe("10");
  });

  test("allows entering SKU", () => {
    const skuInput = screen.getByPlaceholderText("SKU");
    fireEvent.change(skuInput, { target: { value: "ABC123" } });
    expect(skuInput.value).toBe("ABC123");
  });

  test("allows entering description", () => {
    const descriptionTextarea = screen.getByPlaceholderText("Description");
    fireEvent.change(descriptionTextarea, {
      target: { value: "Test description" },
    });
    expect(descriptionTextarea.value).toBe("Test description");
  });

  test("allows entering regular price", () => {
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    fireEvent.change(regularPriceInput, { target: { value: "50" } });
    expect(regularPriceInput.value).toBe("50");
  });

  test("allows adding tags for sizes", () => {
    // Simulate adding tags for sizes
    const sizeInput = screen.getByPlaceholderText("Add Size");
    fireEvent.change(sizeInput, { target: { value: "Small" } });
    fireEvent.keyDown(sizeInput, { key: "Enter", code: "Enter" });

    // Check if the tag is added
    const tagElement = screen.getByText("Small");
    expect(tagElement).toBeInTheDocument();
  });

  test("disables Add Product button when loading", () => {
    // Simulate loading state
    const addButton = screen.getByText("Add Product");

    // Check if the button is disabled
    expect(addButton).toBeDisabled();
  });

  // Test image upload functionality
  test("allows uploading images", () => {
    // Create a mock file
    const file = new File(["(⌐□_□)"], "test.png", { type: "image/png" });
    const fileInput = screen.getByLabelText("Upload Images");

    // Simulate uploading images
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Check if the file is uploaded
    expect(fileInput.files).toHaveLength(1);
    expect(fileInput.files[0].name).toBe("test.png");
  });

  // Test handling of discount price and offer price calculation
  test("calculates offer price based on regular and discount price", () => {
    // Simulate entering regular price and discount price
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Check if the offer price is calculated correctly
    const offerPriceInput = screen.getByPlaceholderText("price");
    expect(offerPriceInput.value).toBe("20");
  });

  // Test form submission
  test("submits form data when Add Product button is clicked", () => {
    const addButton = screen.getByText("Add Product");

    // Simulate form submission
    fireEvent.click(addButton);

    // Check if the form data is submitted
    // You can mock the fetch request and verify if it's called with the correct data
  });

  test("displays error message when regular price is not provided", () => {
    // Ensure regular price input is empty
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    fireEvent.change(regularPriceInput, { target: { value: "" } });

    // Trigger form submission
    const addButton = screen.getByText("Add Product");
    fireEvent.click(addButton);

    // Check if error message is displayed
    const errorMessage = screen.getByText(
      "Please provide a valid regular price"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays success message when product is added successfully", async () => {
    // Mock fetch request to return success response
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });

    // Simulate filling out the form
    const productNameInput = screen.getByPlaceholderText("product name");
    fireEvent.change(productNameInput, { target: { value: "Test Product" } });

    // Trigger form submission
    const addButton = screen.getByText("Add Product");
    fireEvent.click(addButton);

    // Wait for success message
    await waitFor(() => {
      const successMessage = screen.getByText("product added");
      expect(successMessage).toBeInTheDocument();
    });
  });

  test("displays error message when product upload fails", async () => {
    // Mock fetch request to return error response
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Upload failed"));

    // Simulate filling out the form
    const productNameInput = screen.getByPlaceholderText("product name");
    fireEvent.change(productNameInput, { target: { value: "Test Product" } });

    // Trigger form submission
    const addButton = screen.getByText("Add Product");
    fireEvent.click(addButton);

    // Wait for error message
    await waitFor(() => {
      const errorMessage = screen.getByText("product upload failed");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("disables Add Product button when loading", () => {
    const addButton = screen.getByText("Add Product");

    // Check if the button is initially enabled
    expect(addButton).not.toBeDisabled();

    // Trigger form submission
    fireEvent.click(addButton);

    // Check if the button is disabled during loading
    expect(addButton).toBeDisabled();
  });

  test("allows uploading multiple images", () => {
    // Create mock files
    const files = [
      new File(["image1"], "image1.png", { type: "image/png" }),
      new File(["image2"], "image2.png", { type: "image/png" }),
    ];

    // Get the file input element
    const fileInput = screen.getByLabelText("Upload Images");

    // Simulate uploading multiple images
    fireEvent.change(fileInput, { target: { files } });

    // Check if the files are uploaded
    expect(fileInput.files).toHaveLength(2);
    expect(fileInput.files[0].name).toBe("image1.png");
    expect(fileInput.files[1].name).toBe("image2.png");
  });

  test("calculates offer price correctly when discount price is greater than regular price", () => {
    // Simulate entering regular price and discount price
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "50" } });
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Check if the offer price is 0 when discount price is greater than regular price
    const offerPriceInput = screen.getByPlaceholderText("price");
    expect(offerPriceInput.value).toBe("0");
  });

  test("allows submitting the form with all required fields filled", async () => {
    // Mock fetch request to return success response
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });

    // Simulate filling out all required fields
    const productNameInput = screen.getByPlaceholderText("product name");
    fireEvent.change(productNameInput, { target: { value: "Test Product" } });

    const categorySelect = screen.getByLabelText("Category");
    fireEvent.change(categorySelect, { target: { value: "Test Category" } });

    const subCategorySelect = screen.getByLabelText("Sub-category");
    fireEvent.change(subCategorySelect, {
      target: { value: "Test Subcategory" },
    });

    const quantityInput = screen.getByPlaceholderText("quantity");
    fireEvent.change(quantityInput, { target: { value: "10" } });

    const skuInput = screen.getByPlaceholderText("SKU");
    fireEvent.change(skuInput, { target: { value: "ABC123" } });

    const descriptionTextarea = screen.getByPlaceholderText("Description");
    fireEvent.change(descriptionTextarea, {
      target: { value: "Test description" },
    });

    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });

    // Trigger form submission
    const addButton = screen.getByText("Add Product");
    fireEvent.click(addButton);

    // Wait for success message
    await waitFor(() => {
      const successMessage = screen.getByText("product added");
      expect(successMessage).toBeInTheDocument();
    });
  });

  test("displays error message when regular price is not a valid number", () => {
    // Ensure regular price input contains invalid value
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    fireEvent.change(regularPriceInput, { target: { value: "abc" } });

    // Trigger form submission
    const addButton = screen.getByText("Add Product");
    fireEvent.click(addButton);

    // Check if error message is displayed
    const errorMessage = screen.getByText(
      "Please provide a valid regular price"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays error message when no images are uploaded", async () => {
    // Ensure no images are uploaded
    const fileInput = screen.getByLabelText("Upload Images");
    fireEvent.change(fileInput, { target: { files: [] } });

    // Trigger form submission
    const addButton = screen.getByText("Add Product");
    fireEvent.click(addButton);

    // Wait for error message
    await waitFor(() => {
      const errorMessage = screen.getByText("product upload failed");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("displays error message when form submission fails", async () => {
    // Mock fetch request to return error response
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Upload failed"));

    // Simulate filling out the form
    const productNameInput = screen.getByPlaceholderText("product name");
    fireEvent.change(productNameInput, { target: { value: "Test Product" } });

    // Trigger form submission
    const addButton = screen.getByText("Add Product");
    fireEvent.click(addButton);

    // Wait for error message
    await waitFor(() => {
      const errorMessage = screen.getByText("product upload failed");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("displays error message when regular price is not a valid number", () => {
    // Ensure regular price input contains invalid value
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    fireEvent.change(regularPriceInput, { target: { value: "abc" } });

    // Trigger form submission
    const addButton = screen.getByText("Add Product");
    fireEvent.click(addButton);

    // Check if error message is displayed
    const errorMessage = screen.getByText(
      "Please provide a valid regular price"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays error message when no images are uploaded", async () => {
    // Ensure no images are uploaded
    const fileInput = screen.getByLabelText("Upload Images");
    fireEvent.change(fileInput, { target: { files: [] } });

    // Trigger form submission
    const addButton = screen.getByText("Add Product");
    fireEvent.click(addButton);

    // Wait for error message
    await waitFor(() => {
      const errorMessage = screen.getByText("product upload failed");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("displays error message when form submission fails", async () => {
    // Mock fetch request to return error response
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Upload failed"));

    // Simulate filling out the form
    const productNameInput = screen.getByPlaceholderText("product name");
    fireEvent.change(productNameInput, { target: { value: "Test Product" } });

    // Trigger form submission
    const addButton = screen.getByText("Add Product");
    fireEvent.click(addButton);

    // Wait for error message
    await waitFor(() => {
      const errorMessage = screen.getByText("product upload failed");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("allows selecting category and subcategory", () => {
    // Select a category
    const categorySelect = screen.getByLabelText("Category");
    fireEvent.change(categorySelect, { target: { value: "Test Category" } });

    // Check if the selected category is displayed
    expect(categorySelect.value).toBe("Test Category");

    // Select a subcategory
    const subcategorySelect = screen.getByLabelText("Sub-category");
    fireEvent.change(subcategorySelect, {
      target: { value: "Test Subcategory" },
    });

    // Check if the selected subcategory is displayed
    expect(subcategorySelect.value).toBe("Test Subcategory");
  });

  test("disables submit button when required fields are not filled", () => {
    // Ensure submit button is initially enabled
    const submitButton = screen.getByText("Add Product");
    expect(submitButton).not.toBeDisabled();

    // Trigger form submission without filling any required field
    fireEvent.click(submitButton);

    // Check if submit button is disabled when required fields are not filled
    expect(submitButton).toBeDisabled();
  });

  test("displays correct error messages for invalid inputs", async () => {
    // Ensure all required fields are filled with invalid inputs
    const productNameInput = screen.getByPlaceholderText("product name");
    fireEvent.change(productNameInput, { target: { value: "" } });

    const quantityInput = screen.getByPlaceholderText("quantity");
    fireEvent.change(quantityInput, { target: { value: "-5" } });

    const skuInput = screen.getByPlaceholderText("SKU");
    fireEvent.change(skuInput, { target: { value: "" } });

    const descriptionTextarea = screen.getByPlaceholderText("Description");
    fireEvent.change(descriptionTextarea, { target: { value: "" } });

    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    fireEvent.change(regularPriceInput, { target: { value: "abc" } });

    // Trigger form submission
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Wait for error messages
    await waitFor(() => {
      const errorMessageName = screen.getByText(
        "Please provide a valid product name"
      );
      const errorMessageQuantity = screen.getByText(
        "Please provide a valid quantity"
      );
      const errorMessageSku = screen.getByText("Please provide a valid SKU");
      const errorMessageDescription = screen.getByText(
        "Please provide a valid description"
      );
      const errorMessageRegularPrice = screen.getByText(
        "Please provide a valid regular price"
      );

      expect(errorMessageName).toBeInTheDocument();
      expect(errorMessageQuantity).toBeInTheDocument();
      expect(errorMessageSku).toBeInTheDocument();
      expect(errorMessageDescription).toBeInTheDocument();
      expect(errorMessageRegularPrice).toBeInTheDocument();
    });
  });

  test("allows selecting multiple sizes", () => {
    // Check if no sizes are selected initially
    const selectedSizeTags = screen.queryAllByTestId("selected-size-tag");
    expect(selectedSizeTags).toHaveLength(0);

    // Select multiple sizes
    const sizeCheckboxes = screen.getAllByTestId("size-checkbox");
    fireEvent.click(sizeCheckboxes[0]); // Select the first size
    fireEvent.click(sizeCheckboxes[2]); // Select another size

    // Check if the selected sizes are displayed
    const updatedSelectedSizeTags = screen.getAllByTestId("selected-size-tag");
    expect(updatedSelectedSizeTags).toHaveLength(2);
  });

  test("displays error message when trying to upload more than 4 images", async () => {
    // Create mock files
    const files = [
      new File(["image1"], "image1.png", { type: "image/png" }),
      new File(["image2"], "image2.png", { type: "image/png" }),
      new File(["image3"], "image3.png", { type: "image/png" }),
      new File(["image4"], "image4.png", { type: "image/png" }),
      new File(["image5"], "image5.png", { type: "image/png" }),
    ];

    // Get the file input element
    const fileInput = screen.getByLabelText("Upload Images");

    // Simulate uploading more than 4 images
    fireEvent.change(fileInput, { target: { files } });

    // Check if error message is displayed
    const errorMessage = await screen.findByText(
      "image cannot be more than 4 images"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("calculates offer price correctly when regular price and discount price change", async () => {
    // Simulate entering regular price and discount price
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Check if the initial offer price is calculated correctly
    let offerPriceInput = screen.getByPlaceholderText("price");
    expect(offerPriceInput.value).toBe("20");

    // Simulate changing the regular price and discount price
    fireEvent.change(regularPriceInput, { target: { value: "120" } });
    fireEvent.change(discountPriceInput, { target: { value: "100" } });

    // Check if the offer price updates correctly
    offerPriceInput = screen.getByPlaceholderText("price");
    expect(offerPriceInput.value).toBe("20");
  });

  test("updates offer price correctly when regular price and discount price change", () => {
    // Fill out the form with valid data
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Check if the offer price updates correctly
    const offerPriceInput = screen.getByPlaceholderText("price");
    expect(offerPriceInput.value).toBe("20");

    // Change discount price and regular price
    fireEvent.change(discountPriceInput, { target: { value: "70" } });
    fireEvent.change(regularPriceInput, { target: { value: "120" } });

    // Check if the offer price updates correctly
    expect(offerPriceInput.value).toBe("50");
  });

  test("displays error message when no category is selected", async () => {
    // Attempt form submission without selecting a category
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText("Please select a category");
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays error message when no sub-category is selected", async () => {
    // Select a category
    const categorySelect = screen.getByLabelText("Category");
    fireEvent.change(categorySelect, { target: { value: "Electronics" } });

    // Attempt form submission without selecting a sub-category
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Please select a sub-category"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays error message when no images are uploaded", async () => {
    // Attempt to submit the form without uploading images
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Please upload at least one image"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays success message after successful form submission", async () => {
    // Fill out the form with valid data
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Upload images
    const fileInput = screen.getByLabelText("Upload Images");
    fireEvent.change(fileInput, {
      target: {
        files: [new File(["image1"], "image1.jpg", { type: "image/jpeg" })],
      },
    });

    // Submit the form
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the success message is displayed
    const successMessage = await screen.findByText("Product added");
    expect(successMessage).toBeInTheDocument();
  });

  test("displays loading state while submitting the form", async () => {
    // Fill out the form with valid data
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Upload images
    const fileInput = screen.getByLabelText("Upload Images");
    fireEvent.change(fileInput, {
      target: {
        files: [new File(["image1"], "image1.jpg", { type: "image/jpeg" })],
      },
    });

    // Submit the form
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the loading indicator is displayed
    const loadingIndicator = screen.getByText("Add Product").closest("button");
    expect(loadingIndicator).toHaveAttribute("disabled");
  });

  test("displays success message after successful product addition", async () => {
    // Mock fetch request to return success response
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ success: true }),
    });

    // Fill out the form with valid data
    const productNameInput = screen.getByPlaceholderText("product name");
    fireEvent.change(productNameInput, { target: { value: "Test Product" } });

    // Trigger form submission
    const addButton = screen.getByText("Add Product");
    fireEvent.click(addButton);

    // Wait for success message
    await waitFor(() => {
      const successMessage = screen.getByText("product added");
      expect(successMessage).toBeInTheDocument();
    });
  });

  test("displays error message when product addition fails", async () => {
    // Mock fetch request to return error response
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
    });

    // Fill out the form with valid data
    const productNameInput = screen.getByPlaceholderText("product name");
    fireEvent.change(productNameInput, { target: { value: "Test Product" } });

    // Trigger form submission
    const addButton = screen.getByText("Add Product");
    fireEvent.click(addButton);

    // Wait for error message
    await waitFor(() => {
      const errorMessage = screen.getByText("product upload failed");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("resets form after successful product addition", async () => {
    // Mock fetch request to return success response
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ success: true }),
    });

    // Fill out the form with valid data
    const productNameInput = screen.getByPlaceholderText("product name");
    fireEvent.change(productNameInput, { target: { value: "Test Product" } });

    // Trigger form submission
    const addButton = screen.getByText("Add Product");
    fireEvent.click(addButton);

    // Wait for success message
    await waitFor(() => {
      const successMessage = screen.getByText("product added");
      expect(successMessage).toBeInTheDocument();

      // Check if form is reset after successful addition
      expect(productNameInput.value).toBe("");
    });
  });

  // Write more tests for other form inputs and functionality as needed

  test("displays loading state while submitting the form", async () => {
    // Mock fetch request to simulate loading state
    global.fetch = jest.fn().mockImplementation(() => new Promise(() => {}));

    // Fill out the form with valid data
    const productNameInput = screen.getByPlaceholderText("product name");
    fireEvent.change(productNameInput, { target: { value: "Test Product" } });

    // Trigger form submission
    const addButton = screen.getByText("Add Product");
    fireEvent.click(addButton);

    // Check if loading indicator is displayed
    const loadingIndicator = screen.getByTestId("loading-indicator");
    expect(loadingIndicator).toBeInTheDocument();
  });

  test("correctly calculates offer price when regular price or discount price changes", () => {
    // Simulate entering regular price and discount price
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Check if the initial offer price is calculated correctly
    let offerPriceInput = screen.getByPlaceholderText("price");
    expect(offerPriceInput.value).toBe("20");

    // Simulate changing the regular price
    fireEvent.change(regularPriceInput, { target: { value: "120" } });

    // Check if the offer price updates correctly
    offerPriceInput = screen.getByPlaceholderText("price");
    expect(offerPriceInput.value).toBe("40");
  });

  test("correctly updates selected images when uploading", () => {
    // Create mock files
    const files = [
      new File(["image1"], "image1.png", { type: "image/png" }),
      new File(["image2"], "image2.png", { type: "image/png" }),
    ];

    // Get the file input element
    const fileInput = screen.getByLabelText("Upload Images");

    // Simulate uploading images
    fireEvent.change(fileInput, { target: { files } });

    // Check if the selected images are updated correctly
    const selectedImages = screen.getAllByTestId("selected-image");
    expect(selectedImages).toHaveLength(2);
  });

  test("disables submit button when no sizes are selected", () => {
    // Check if submit button is disabled initially
    const submitButton = screen.getByText("Add Product");
    expect(submitButton).toBeDisabled();

    // Attempt form submission without selecting any sizes
    fireEvent.click(submitButton);

    // Check if submit button remains disabled
    expect(submitButton).toBeDisabled();
  });

  test("allows selecting and deselecting sizes", () => {
    // Select a size
    const sizeCheckbox = screen.getByLabelText("Small");
    fireEvent.click(sizeCheckbox);

    // Check if the size is selected
    expect(sizeCheckbox).toBeChecked();

    // Deselect the size
    fireEvent.click(sizeCheckbox);

    // Check if the size is deselected
    expect(sizeCheckbox).not.toBeChecked();
  });

  test("displays correct error message when regular price is invalid", async () => {
    // Fill out the form with an invalid regular price
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    fireEvent.change(regularPriceInput, { target: { value: "invalid" } });

    // Attempt form submission
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Please provide a valid regular price"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays correct error message when discount price is greater than regular price", async () => {
    // Fill out the form with a discount price greater than regular price
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "120" } });

    // Attempt form submission
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Discount price cannot be greater than regular price"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("correctly updates discount price when offer price changes", () => {
    // Fill out the form with valid data
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });

    // Calculate offer price
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Check if discount price updates correctly when offer price changes
    const offerPriceInput = screen.getByPlaceholderText("price");
    fireEvent.change(offerPriceInput, { target: { value: "60" } });

    // Check if the discount price updates accordingly
    expect(discountPriceInput.value).toBe("40");
  });

  test("displays correct error message when no images are uploaded", async () => {
    // Attempt form submission without uploading any images
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Please upload at least one image"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays correct error message when video field is left empty", async () => {
    // Attempt form submission without filling out the video field
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText("Please provide a video");
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays correct subcategories based on selected category", async () => {
    // Select a category
    const categorySelect = screen.getByLabelText("Category");
    fireEvent.change(categorySelect, { target: { value: "Clothing" } });

    // Wait for subcategories to be populated
    await waitFor(() => {
      const subcategoryOptions = screen.getAllByTestId("subcategory-option");
      expect(subcategoryOptions).toHaveLength(3); // Assuming Clothing category has 3 subcategories
    });
  });

  test("correctly updates selected subcategory based on user selection", async () => {
    // Select a category
    const categorySelect = screen.getByLabelText("Category");
    fireEvent.change(categorySelect, { target: { value: "Electronics" } });

    // Wait for subcategories to be populated
    await waitFor(() => {
      const subcategorySelect = screen.getByLabelText("Sub-category");
      fireEvent.change(subcategorySelect, {
        target: { value: "Mobile Phones" },
      });

      // Check if the selected subcategory updates accordingly
      expect(subcategorySelect.value).toBe("Mobile Phones");
    });
  });

  test("disables offer price input when discount price input is empty", () => {
    // Fill out the regular price and discount price inputs
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "" } });

    // Check if the offer price input is disabled
    const offerPriceInput = screen.getByPlaceholderText("price");
    expect(offerPriceInput).toBeDisabled();
  });

  test("adds selected sizes to the form data", () => {
    // Select sizes
    const smallCheckbox = screen.getByLabelText("Small");
    const mediumCheckbox = screen.getByLabelText("Medium");
    fireEvent.click(smallCheckbox);
    fireEvent.click(mediumCheckbox);

    // Check if selected sizes are added to the form data
    const formData = screen.getByTestId("form-data");
    expect(formData.textContent).toContain("Small");
    expect(formData.textContent).toContain("Medium");
  });

  test("displays error message when attempting to upload more than 4 images", async () => {
    // Create mock files
    const files = [
      new File(["image1"], "image1.png", { type: "image/png" }),
      new File(["image2"], "image2.png", { type: "image/png" }),
      new File(["image3"], "image3.png", { type: "image/png" }),
      new File(["image4"], "image4.png", { type: "image/png" }),
      new File(["image5"], "image5.png", { type: "image/png" }),
    ];

    // Get the file input element
    const fileInput = screen.getByLabelText("Upload Images");

    // Simulate uploading images
    fireEvent.change(fileInput, { target: { files } });

    // Check if the error message is displayed
    const errorMessage = await screen.findByText(
      "Image cannot be more than 4 images"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("correctly updates offer price when discount price changes", () => {
    // Fill out the regular price and discount price inputs
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Check if the offer price updates correctly
    const offerPriceInput = screen.getByPlaceholderText("price");
    expect(offerPriceInput.value).toBe("20");
  });

  test("displays correct error message when regular price is negative", async () => {
    // Fill out the form with a negative regular price
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    fireEvent.change(regularPriceInput, { target: { value: "-100" } });

    // Attempt form submission
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Regular price cannot be negative"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays correct error message when discount price is negative", async () => {
    // Fill out the form with a negative discount price
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "-80" } });

    // Attempt form submission
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Discount price cannot be negative"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays correct error message when SKU is not provided", async () => {
    // Attempt form submission without providing SKU
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText("Please provide a SKU");
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays correct error message when regular price is zero", async () => {
    // Fill out the form with a regular price of zero
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    fireEvent.change(regularPriceInput, { target: { value: "0" } });

    // Attempt form submission
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Regular price cannot be zero"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays correct error message when SKU is too short", async () => {
    // Fill out the form with a short SKU
    const skuInput = screen.getByPlaceholderText("SKU");
    fireEvent.change(skuInput, { target: { value: "AB12" } });

    // Attempt form submission
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "SKU must be at least 6 characters long"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays correct error message when video is not provided", async () => {
    // Attempt form submission without providing a video
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText("Please provide a video");
    expect(errorMessage).toBeInTheDocument();
  });

  test("correctly updates subcategory options based on selected category", () => {
    // Select a category
    const categorySelect = screen.getByLabelText("Category");
    fireEvent.change(categorySelect, { target: { value: "Electronics" } });

    // Check if subcategory options are updated
    const subcategorySelect = screen.getByLabelText("Sub-category");
    expect(subcategorySelect.children).toHaveLength(4); // Assuming Electronics category has 4 subcategories
  });

  test("displays correct error message when no size tags are selected", () => {
    // Attempt form submission without selecting any size tags
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = screen.getByText("Please select at least one size");
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays correct error message when no category is selected", () => {
    // Attempt form submission without selecting a category
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = screen.getByText("Please select a category");
    expect(errorMessage).toBeInTheDocument();
  });

  test("correctly updates offer price when discount price is greater than regular price", () => {
    // Fill out the form with valid data
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "120" } });

    // Check if the offer price updates to zero
    const offerPriceInput = screen.getByPlaceholderText("price");
    expect(offerPriceInput.value).toBe("0");
  });

  test("disables submit button when loading state is true", async () => {
    // Set loading state to true
    fireEvent.submit(screen.getByTestId("myForm"));
    expect(screen.getByTestId("myForm")).toHaveClass("loading");
  });

  test("displays success toast message after successful form submission", async () => {
    // Fill out the form with valid data
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Submit the form
    fireEvent.submit(screen.getByTestId("myForm"));

    // Check if success toast message is displayed
    expect(await screen.findByText("Product added")).toBeInTheDocument();
  });

  test("correctly updates offer price when discount price is less than regular price", () => {
    // Fill out the form with valid data
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Check if the offer price updates correctly
    const offerPriceInput = screen.getByPlaceholderText("price");
    expect(offerPriceInput.value).toBe("20");
  });

  test("displays error toast message after failed form submission", async () => {
    // Fill out the form with invalid data
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    fireEvent.change(regularPriceInput, { target: { value: "-100" } });

    // Submit the form
    fireEvent.submit(screen.getByTestId("myForm"));

    // Check if error toast message is displayed
    expect(
      await screen.findByText("Product upload failed")
    ).toBeInTheDocument();
  });

  test("correctly updates subcategory state when a new category is selected", () => {
    // Select a new category
    const categorySelect = screen.getByLabelText("Category");
    fireEvent.change(categorySelect, { target: { value: "Electronics" } });

    // Check if the subcategory state is updated
    const subcategorySelect = screen.getByLabelText("Sub-category");
    expect(subcategorySelect.children).toHaveLength(4); // Assuming Electronics category has 4 subcategories
  });

  test("correctly updates offer price when discount price is less than regular price", () => {
    // Fill out the form with valid data
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Check if the offer price updates correctly
    const offerPriceInput = screen.getByPlaceholderText("price");
    expect(offerPriceInput.value).toBe("20");
  });

  test("displays error toast message after failed form submission", async () => {
    // Fill out the form with invalid data
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    fireEvent.change(regularPriceInput, { target: { value: "-100" } });

    // Submit the form
    fireEvent.submit(screen.getByTestId("myForm"));

    // Check if error toast message is displayed
    expect(
      await screen.findByText("Product upload failed")
    ).toBeInTheDocument();
  });

  test("correctly updates subcategory state when a new category is selected", () => {
    // Select a new category
    const categorySelect = screen.getByLabelText("Category");
    fireEvent.change(categorySelect, { target: { value: "Electronics" } });

    // Check if the subcategory state is updated
    const subcategorySelect = screen.getByLabelText("Sub-category");
    expect(subcategorySelect.children).toHaveLength(4); // Assuming Electronics category has 4 subcategories
  });

  test("correctly updates selected images state when uploading images", () => {
    // Mock file object
    const file1 = new File(["image1"], "image1.png", { type: "image/png" });
    const file2 = new File(["image2"], "image2.png", { type: "image/png" });

    // Get file input element
    const fileInput = screen.getByLabelText("Upload Images");

    // Upload images
    fireEvent.change(fileInput, { target: { files: [file1, file2] } });

    // Check if selected images state is updated
    const selectedImages = screen.getByTestId("selected-images");
    expect(selectedImages.children).toHaveLength(2);
  });

  test("displays error message when no images are uploaded", async () => {
    // Attempt form submission without uploading images
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Please upload at least one image"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("correctly updates size tags state when selecting sizes", () => {
    // Get size tag checkboxes
    const smallCheckbox = screen.getByLabelText("Small");
    const mediumCheckbox = screen.getByLabelText("Medium");

    // Select sizes
    fireEvent.click(smallCheckbox);
    fireEvent.click(mediumCheckbox);

    // Check if size tags state is updated
    const sizeTags = screen.getByTestId("size-tags");
    expect(sizeTags.children).toHaveLength(2);
  });

  test("updates discount price and offer price when regular price changes", () => {
    // Fill out the form with valid data
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });

    // Check if the discount price and offer price are updated
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    const offerPriceInput = screen.getByPlaceholderText("price");
    expect(discountPriceInput.value).toBe("0");
    expect(offerPriceInput.value).toBe("0");
  });

  test("correctly handles new arrival checkbox state change", () => {
    // Check the new arrival checkbox
    const newArrivalCheckbox = screen.getByLabelText("New Arrival");
    fireEvent.click(newArrivalCheckbox);

    // Check if the checkbox is checked
    expect(newArrivalCheckbox.checked).toBe(true);
  });

  test("displays error message when description is not provided", async () => {
    // Attempt form submission without providing a description
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Please provide a description"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays correct error message when no category is selected", async () => {
    // Attempt form submission without selecting a category
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText("Please select a category");
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays correct error message when no sub-category is selected", async () => {
    // Attempt form submission without selecting a sub-category
    const categorySelect = screen.getByLabelText("Category");
    fireEvent.change(categorySelect, { target: { value: "Electronics" } });

    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Please select a sub-category"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays correct error message when no images are uploaded", async () => {
    // Attempt form submission without uploading images
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Please upload at least one image"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays correct error message when no size tags are selected", async () => {
    // Attempt form submission without selecting size tags
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Please select at least one size"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("correctly updates offer price when discount price is less than regular price", () => {
    // Fill out the form with valid data
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Check if the offer price updates correctly
    const offerPriceInput = screen.getByPlaceholderText("price");
    expect(offerPriceInput.value).toBe("20");
  });

  test("disables submit button when loading state is true", async () => {
    // Set loading state to true
    const submitButton = screen.getByText("Add Product");
    fireEvent.submit(submitButton);

    // Check if the submit button is disabled
    expect(submitButton).toBeDisabled();
  });

  test("displays success toast message after successful form submission", async () => {
    // Fill out the form with valid data
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Submit the form
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if success toast message is displayed
    const successMessage = await screen.findByText("Product added");
    expect(successMessage).toBeInTheDocument();
  });

  test("correctly updates subcategory state when a new category is selected", () => {
    // Select a new category
    const categorySelect = screen.getByLabelText("Category");
    fireEvent.change(categorySelect, { target: { value: "Electronics" } });

    // Check if the subcategory state is updated
    const subcategorySelect = screen.getByLabelText("Sub-category");
    expect(subcategorySelect.children).toHaveLength(4); // Assuming Electronics category has 4 subcategories
  });

  test("updates offer price when discount price and regular price change", () => {
    // Fill out the form with valid data
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Check if the offer price updates correctly
    const offerPriceInput = screen.getByPlaceholderText("price");
    expect(offerPriceInput.value).toBe("20");

    // Change discount price and regular price
    fireEvent.change(discountPriceInput, { target: { value: "70" } });
    fireEvent.change(regularPriceInput, { target: { value: "120" } });

    // Check if the offer price updates correctly
    expect(offerPriceInput.value).toBe("50");
  });

  test("correctly handles new arrival checkbox state change", () => {
    // Get new arrival checkbox
    const newArrivalCheckbox = screen.getByLabelText("New Arrival");

    // Check the checkbox
    fireEvent.click(newArrivalCheckbox);
    expect(newArrivalCheckbox.checked).toBe(true);

    // Uncheck the checkbox
    fireEvent.click(newArrivalCheckbox);
    expect(newArrivalCheckbox.checked).toBe(false);
  });

  test("displays error message when description is not provided", async () => {
    // Attempt form submission without providing a description
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Please provide a description"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays error message when no SKU is provided", async () => {
    // Attempt form submission without providing SKU
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText("Please provide SKU");
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays error message when regular price is invalid", async () => {
    // Attempt to submit form with invalid regular price
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    fireEvent.change(regularPriceInput, { target: { value: "-50" } });
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Please provide a valid regular price"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("correctly updates subcategory options when category changes", () => {
    // Select a different category
    const categorySelect = screen.getByLabelText("Category");
    fireEvent.change(categorySelect, { target: { value: "Electronics" } });

    // Check if subcategory options are updated
    const subcategorySelect = screen.getByLabelText("Sub-category");
    expect(subcategorySelect.children?.length).toBeGreaterThan(0); // Assuming Electronics category has subcategories
  });

  test("correctly updates selected size tags", () => {
    // Select some size tags
    const smallCheckbox = screen.getByLabelText("Small");
    const mediumCheckbox = screen.getByLabelText("Medium");
    fireEvent.click(smallCheckbox);
    fireEvent.click(mediumCheckbox);

    // Check if size tags are updated
    const selectedSizeTags = screen.getByTestId("size-tags");
    expect(selectedSizeTags.children).toHaveLength(2);
  });

  test("displays error message when no images are uploaded", async () => {
    // Attempt to submit form without uploading images
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Please upload at least one image"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("updates offer price correctly when regular price and discount price change", () => {
    // Fill out the form with valid data
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Check if the offer price updates correctly
    const offerPriceInput = screen.getByPlaceholderText("price");
    expect(offerPriceInput.value).toBe("20");

    // Change discount price and regular price
    fireEvent.change(discountPriceInput, { target: { value: "70" } });
    fireEvent.change(regularPriceInput, { target: { value: "120" } });

    // Check if the offer price updates correctly
    expect(offerPriceInput.value).toBe("50");
  });

  test("displays error message when no category is selected", async () => {
    // Attempt form submission without selecting a category
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText("Please select a category");
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays error message when no sub-category is selected", async () => {
    // Select a category
    const categorySelect = screen.getByLabelText("Category");
    fireEvent.change(categorySelect, { target: { value: "Electronics" } });

    // Attempt form submission without selecting a sub-category
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Please select a sub-category"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("updates offer price when regular price and discount price change", () => {
    // Fill out the form with valid data
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Check if the offer price updates correctly
    const offerPriceInput = screen.getByPlaceholderText("price");
    expect(offerPriceInput.value).toBe("20");

    // Change discount price and regular price
    fireEvent.change(discountPriceInput, { target: { value: "70" } });
    fireEvent.change(regularPriceInput, { target: { value: "120" } });

    // Check if the offer price updates correctly
    expect(offerPriceInput.value).toBe("50");
  });

  test("displays error message when no category is selected", async () => {
    // Attempt form submission without selecting a category
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText("Please select a category");
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays error message when no sub-category is selected", async () => {
    // Select a category
    const categorySelect = screen.getByLabelText("Category");
    fireEvent.change(categorySelect, { target: { value: "Electronics" } });

    // Attempt form submission without selecting a sub-category
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Please select a sub-category"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays error message when no images are uploaded", async () => {
    // Attempt to submit the form without uploading images
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the correct error message is displayed
    const errorMessage = await screen.findByText(
      "Please upload at least one image"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays success message after successful form submission", async () => {
    // Fill out the form with valid data
    const regularPriceInput = screen.getByPlaceholderText("Regular price");
    const discountPriceInput = screen.getByPlaceholderText("Discount Price");
    fireEvent.change(regularPriceInput, { target: { value: "100" } });
    fireEvent.change(discountPriceInput, { target: { value: "80" } });

    // Upload images
    const fileInput = screen.getByLabelText("Upload Images");
    fireEvent.change(fileInput, {
      target: {
        files: [new File(["image1"], "image1.jpg", { type: "image/jpeg" })],
      },
    });

    // Submit the form
    const submitButton = screen.getByText("Add Product");
    fireEvent.click(submitButton);

    // Check if the success message is displayed
    const successMessage = await screen.findByText("Product added");
    expect(successMessage).toBeInTheDocument();
  });
});
