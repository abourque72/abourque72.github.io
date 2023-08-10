function [Q,R] = bourque_MGSR(A)
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
        for i = 1:k-1
            a = dot(A(:,k),A(:,i));
            A(:,k) = A(:,k) - a*A(:,i);
            R(i,k) = R(i,k) + a;
        end
        R(k,k) = norm(A(:,k));
        if R(k,k) == 0
            disp('input not full rank')
            Q = 0;
            R = 0;
            return
        end
        A(:,k) = (1/R(k,k))*A(:,k);
    end
    Q = A;
end