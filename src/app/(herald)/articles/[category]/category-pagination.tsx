import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

type Props = {
	currentPage: number;
	pagination: {
		currentPage: number;
		nextPage: number | null;
		previousPage: number | null;
	};
};

export const CategoryPagination = ({ pagination, currentPage }: Props) => {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href={`?page=${pagination?.previousPage || pagination?.currentPage}`} />
				</PaginationItem>

				{pagination?.previousPage && (
					<>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>

						<PaginationItem>
							<PaginationLink href={`?page=${currentPage - 1}`}>{currentPage - 1}</PaginationLink>
						</PaginationItem>
					</>
				)}

				<PaginationItem>
					<PaginationLink href='' isActive>
						{currentPage}
					</PaginationLink>
				</PaginationItem>

				{pagination?.nextPage && (
					<>
						<PaginationItem>
							<PaginationLink href={`?page=${currentPage + 1}`}>{currentPage + 1}</PaginationLink>
						</PaginationItem>

						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					</>
				)}

				<PaginationItem>
					<PaginationNext href={`?page=${pagination?.nextPage || pagination?.currentPage}`} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
