function [Q,R] = bourque_MGS(A)
    [n,m] = size(A);
    if n < m
        disp('input must have #rows >= #cols')
        Q = 0;
        R = 0;
        return
    end
    R = zeros(m,m);
    for k = 1:m
        for i = 1:k-1
            R(i,k) = dot(A(:,k),A(:,i));
            A(:,k) = A(:,k) - R(i,k)*A(:,i);
        end
        R(k,k) = norm(A(:,k));
        if R(k,k) == 0
            disp('input is not full rank')
            Q = 0;
            R = 0;
            return
        end
        A(:,k) = (1/R(k,k))*A(:,k);
    end
    Q = A;
end