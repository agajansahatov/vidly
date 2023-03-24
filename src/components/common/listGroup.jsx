import React from "react";

const ListGroup = (props) => {
	const { items, textProperty, valueProperty, selectedItem, onItemSelect } =
		props;

	return (
		<ul className="list-group">
			{items.map((item) => (
				<li
					key={item[valueProperty] ? item[valueProperty] : "allGenres"}
					className={
						item === selectedItem || item.name === selectedItem
							? "list-group-item active"
							: "list-group-item"
					}
					style={{ cursor: "pointer" }}
					onClick={() => onItemSelect(item)}
				>
					{item[textProperty]}
				</li>
			))}
		</ul>
	);
};

ListGroup.defaultProps = {
	textProperty: "name",
	valueProperty: "_id",
};

export default ListGroup;
