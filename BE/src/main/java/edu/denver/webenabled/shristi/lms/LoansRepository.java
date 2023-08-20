package edu.denver.webenabled.shristi.lms;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoansRepository extends JpaRepository<Loan, Long> {

    Loan findByLoanIdAndBook_bookId(Long loanId, Long bookId);
}
