import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditCategoryModal = ({
  show,
  handleClose,
  category,
  setCategory,
  handleUpdate,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Category</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {category && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={category.description}
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleUpdate}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
);

export default EditCategoryModal;
